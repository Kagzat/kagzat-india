
import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Type, 
  AlignLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Hash, 
  ChevronDown, 
  Circle, 
  Square, 
  Upload, 
  Link, 
  FileText, 
  CheckSquare, 
  Minus, 
  Eye, 
  Save, 
  Settings, 
  Undo, 
  Redo,
  Trash2,
  GripVertical,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formFieldLibrary, documentLibrary, formatFieldName, formatDocumentName } from '@/lib/formLibrary';

interface FormElement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
  category?: string;
  fieldName?: string;
  documentTypes?: string[];
  minLength?: number;
  maxLength?: number;
}

const FormBuilder = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('Document Verification Form');
  const [activeTab, setActiveTab] = useState('basic');
  const [formElements, setFormElements] = useState<FormElement[]>([
    {
      id: '1',
      type: 'section',
      label: 'Personal Information',
      required: false
    },
    {
      id: '2',
      type: 'predefined-field',
      label: formatFieldName('full_name'),
      required: true,
      fieldName: 'full_name',
      category: 'Identity',
      minLength: 3,
      maxLength: 100,
      placeholder: 'Enter your full name'
    },
    {
      id: '3',
      type: 'predefined-field',
      label: formatFieldName('email_address'),
      required: true,
      fieldName: 'email_address',
      category: 'Miscellaneous',
      minLength: 5,
      maxLength: 100,
      placeholder: 'Enter your email address'
    },
    {
      id: '4',
      type: 'document-upload',
      label: 'Identity Verification',
      required: true,
      documentTypes: ['passport', 'national_id_card', 'driving_license'],
      helpText: 'Upload any government-issued ID document'
    }
  ]);

  const componentPalette = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'textarea', label: 'Text Area', icon: AlignLeft },
    { type: 'email', label: 'Email Input', icon: Mail },
    { type: 'phone', label: 'Phone Number', icon: Phone },
    { type: 'date', label: 'Date Picker', icon: Calendar },
    { type: 'number', label: 'Number Input', icon: Hash },
    { type: 'select', label: 'Dropdown', icon: ChevronDown },
    { type: 'radio', label: 'Radio Buttons', icon: Circle },
    { type: 'checkbox', label: 'Checkboxes', icon: Square },
    { type: 'file', label: 'File Upload', icon: Upload },
    { type: 'section', label: 'Section Header', icon: Minus },
  ];

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'palette' && result.destination.droppableId === 'canvas') {
      // Adding new element from palette
      const newElement: FormElement = {
        id: Date.now().toString(),
        type: result.draggableId,
        label: `New ${componentPalette.find(c => c.type === result.draggableId)?.label}`,
        required: false,
        placeholder: result.draggableId === 'text' ? 'Enter text...' : undefined,
        options: ['radio', 'checkbox', 'select'].includes(result.draggableId) ? ['Option 1', 'Option 2'] : undefined
      };

      const newElements = [...formElements];
      newElements.splice(result.destination.index, 0, newElement);
      setFormElements(newElements);
    } else if (result.source.droppableId.startsWith('predefined-') && result.destination.droppableId === 'canvas') {
      // Adding predefined field from library
      const [, category, fieldName] = result.source.droppableId.split('-');
      const field = formFieldLibrary[category as keyof typeof formFieldLibrary].find(f => f.name === fieldName);
      
      if (field) {
        const newElement: FormElement = {
          id: Date.now().toString(),
          type: 'predefined-field',
          label: formatFieldName(field.name),
          required: false,
          fieldName: field.name,
          category,
          minLength: field.min_length,
          maxLength: field.max_length,
          placeholder: `Enter ${formatFieldName(field.name).toLowerCase()}`
        };

        const newElements = [...formElements];
        newElements.splice(result.destination.index, 0, newElement);
        setFormElements(newElements);
      }
    } else if (result.source.droppableId.startsWith('document-') && result.destination.droppableId === 'canvas') {
      // Adding document upload from library
      const category = result.source.droppableId.replace('document-', '');
      const documents = documentLibrary[category as keyof typeof documentLibrary];
      
      const newElement: FormElement = {
        id: Date.now().toString(),
        type: 'document-upload',
        label: `${category} Document Upload`,
        required: true,
        documentTypes: documents,
        helpText: `Upload any of the following: ${documents.map(doc => formatDocumentName(doc)).join(', ')}`
      };

      const newElements = [...formElements];
      newElements.splice(result.destination.index, 0, newElement);
      setFormElements(newElements);
    } else if (result.source.droppableId === 'canvas' && result.destination.droppableId === 'canvas') {
      // Reordering existing elements
      const newElements = [...formElements];
      const [reorderedItem] = newElements.splice(result.source.index, 1);
      newElements.splice(result.destination.index, 0, reorderedItem);
      setFormElements(newElements);
    }
  };

  const updateElement = (id: string, updates: Partial<FormElement>) => {
    setFormElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setFormElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const renderFormElement = (element: FormElement, index: number, isPreview = false) => {
    const isSelected = selectedElement === element.id && !isPreview;
    
    const elementContent = () => {
      switch (element.type) {
        case 'section':
          return <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">{element.label}</h3>;
        case 'predefined-field':
          return (
            <div>
              <Label className="flex items-center gap-2">
                {element.label} 
                {element.required && <span className="text-red-500">*</span>}
                {element.category && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{element.category}</span>}
              </Label>
              <Input 
                placeholder={element.placeholder} 
                className="mt-1" 
                maxLength={element.maxLength}
              />
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
              {element.minLength && element.maxLength && (
                <p className="text-xs text-gray-400 mt-1">
                  {element.minLength}-{element.maxLength} characters
                </p>
              )}
            </div>
          );
        case 'document-upload':
          return (
            <div>
              <Label className="flex items-center gap-2">
                {element.label} 
                {element.required && <span className="text-red-500">*</span>}
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Document</span>
              </Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                {element.documentTypes && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Accepted documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {element.documentTypes.slice(0, 3).map((docType, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {formatDocumentName(docType)}
                        </span>
                      ))}
                      {element.documentTypes.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{element.documentTypes.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'text':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <Input placeholder={element.placeholder} className="mt-1" />
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'textarea':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <Textarea placeholder={element.placeholder} className="mt-1" />
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'email':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <Input type="email" placeholder={element.placeholder} className="mt-1" />
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'select':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {element.options?.map((option, idx) => (
                    <SelectItem key={idx} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'radio':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <div className="mt-2 space-y-2">
                {element.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input type="radio" name={element.id} id={`${element.id}-${idx}`} />
                    <label htmlFor={`${element.id}-${idx}`}>{option}</label>
                  </div>
                ))}
              </div>
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        case 'file':
          return (
            <div>
              <Label>{element.label} {element.required && <span className="text-red-500">*</span>}</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
              {element.helpText && <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>}
            </div>
          );
        default:
          return <div>Unknown element type</div>;
      }
    };

    if (isPreview) {
      return (
        <div key={element.id} className="mb-4">
          {elementContent()}
        </div>
      );
    }

    return (
      <Draggable key={element.id} draggableId={element.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`mb-4 p-3 rounded-md border-2 transition-all ${
              isSelected 
                ? 'border-blue-500 bg-blue-50' 
                : snapshot.isDragging 
                ? 'border-gray-400 bg-gray-50' 
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setSelectedElement(element.id)}
          >
            <div className="flex items-start gap-2">
              <div {...provided.dragHandleProps} className="mt-1 cursor-grab">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1">
                {elementContent()}
              </div>
              {isSelected && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const selectedElementData = formElements.find(el => el.id === selectedElement);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Left Sidebar - Component Palette */}
          {!isPreviewMode && (
            <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-4">Form Elements</h3>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic">
                  <Droppable droppableId="palette" isDropDisabled={true}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="space-y-2">
                          {componentPalette.map((component, index) => (
                            <Draggable key={component.type} draggableId={component.type} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`flex items-center gap-2 p-2 rounded-md border cursor-grab transition-all ${
                                    snapshot.isDragging ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                                  }`}
                                >
                                  <component.icon className="h-4 w-4 text-gray-600" />
                                  <span className="text-sm">{component.label}</span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </TabsContent>

                <TabsContent value="fields">
                  <div className="space-y-4">
                    {Object.entries(formFieldLibrary).map(([category, fields]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                        <Droppable droppableId={`predefined-${category}`} isDropDisabled={true}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              <div className="space-y-1">
                                {fields.slice(0, 5).map((field, index) => (
                                  <Draggable key={field.name} draggableId={field.name} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`p-2 rounded border text-sm cursor-grab transition-all ${
                                          snapshot.isDragging ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                                        }`}
                                      >
                                        <div className="font-medium">{formatFieldName(field.name)}</div>
                                        <div className="text-xs text-gray-500">
                                          {field.min_length}-{field.max_length} chars
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {fields.length > 5 && (
                                  <div className="text-xs text-gray-500 px-2">
                                    +{fields.length - 5} more fields
                                  </div>
                                )}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="docs">
                  <div className="space-y-4">
                    {Object.entries(documentLibrary).map(([category, documents]) => (
                      <div key={category}>
                        <Droppable droppableId={`document-${category}`} isDropDisabled={true}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              <Draggable key={category} draggableId={category} index={0}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 rounded border cursor-grab transition-all ${
                                      snapshot.isDragging ? 'bg-green-100 border-green-300' : 'bg-green-50 hover:bg-green-100 border-green-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <Upload className="h-4 w-4 text-green-600" />
                                      <span className="font-medium text-green-800">{category} Documents</span>
                                    </div>
                                    <div className="text-xs text-green-600">
                                      {documents.length} document types
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {documents.slice(0, 2).map(doc => formatDocumentName(doc)).join(', ')}
                                      {documents.length > 2 && '...'}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Center Canvas - Form Builder */}
          <div className={`flex-1 p-6 overflow-y-auto ${isPreviewMode ? 'max-w-2xl mx-auto' : ''}`}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{formTitle}</CardTitle>
                <p className="text-gray-600">Please fill out all required fields to submit your verification request.</p>
              </CardHeader>
              <CardContent>
                {isPreviewMode ? (
                  <div className="space-y-4">
                    {formElements.map((element, index) => renderFormElement(element, index, true))}
                    <Button className="w-full mt-6">Submit Request</Button>
                  </div>
                ) : (
                  <Droppable droppableId="canvas">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-96 transition-all ${
                          snapshot.isDraggingOver ? 'bg-blue-50 border-blue-200' : 'bg-white'
                        } ${formElements.length === 0 ? 'border-2 border-dashed border-gray-300 rounded-lg p-8 text-center' : ''}`}
                      >
                        {formElements.length === 0 ? (
                          <div className="text-gray-500">
                            <FileText className="mx-auto h-12 w-12 mb-4" />
                            <p className="text-lg font-medium">Start building your form</p>
                            <p className="text-sm">Drag elements from the sidebar to create your form</p>
                          </div>
                        ) : (
                          formElements.map((element, index) => renderFormElement(element, index))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Properties Panel */}
          {!isPreviewMode && (
            <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-4">Properties</h3>
              
              {selectedElementData ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="label">Field Label</Label>
                    <Input
                      id="label"
                      value={selectedElementData.label}
                      onChange={(e) => updateElement(selectedElementData.id, { label: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  
                  {selectedElementData.type !== 'section' && (
                    <>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="required">Required Field</Label>
                        <Switch
                          id="required"
                          checked={selectedElementData.required}
                          onCheckedChange={(checked) => updateElement(selectedElementData.id, { required: checked })}
                        />
                      </div>
                      
                      {selectedElementData.type === 'predefined-field' && (
                        <>
                          <div>
                            <Label>Field Category</Label>
                            <Input
                              value={selectedElementData.category || ''}
                              disabled
                              className="mt-1 bg-gray-50"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label>Min Length</Label>
                              <Input
                                type="number"
                                value={selectedElementData.minLength || ''}
                                onChange={(e) => updateElement(selectedElementData.id, { minLength: parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Max Length</Label>
                              <Input
                                type="number"
                                value={selectedElementData.maxLength || ''}
                                onChange={(e) => updateElement(selectedElementData.id, { maxLength: parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedElementData.type === 'document-upload' && (
                        <div>
                          <Label>Accepted Documents</Label>
                          <div className="mt-2 space-y-1">
                            {selectedElementData.documentTypes?.map((docType, index) => (
                              <div key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {formatDocumentName(docType)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="helpText">Help Text</Label>
                        <Textarea
                          id="helpText"
                          value={selectedElementData.helpText || ''}
                          onChange={(e) => updateElement(selectedElementData.id, { helpText: e.target.value })}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Settings className="mx-auto h-12 w-12 mb-4" />
                  <p>Select an element to edit its properties</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
