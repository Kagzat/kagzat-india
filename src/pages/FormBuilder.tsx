
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
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FormElement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
}

const FormBuilder = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('Transcript Verification Form');
  const [formElements, setFormElements] = useState<FormElement[]>([
    {
      id: '1',
      type: 'section',
      label: 'Student Information',
      required: false
    },
    {
      id: '2',
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      id: '3',
      type: 'text',
      label: 'Student ID',
      required: false,
      placeholder: 'Enter your student ID'
    },
    {
      id: '4',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'Enter your email address'
    },
    {
      id: '5',
      type: 'select',
      label: 'Graduation Year',
      required: true,
      options: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
    },
    {
      id: '6',
      type: 'radio',
      label: 'Degree Type',
      required: true,
      options: ['Bachelor\'s', 'Master\'s', 'PhD']
    },
    {
      id: '7',
      type: 'file',
      label: 'Upload Official Transcript',
      required: true,
      helpText: 'Please upload your official transcript in PDF format'
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
    { type: 'link', label: 'Google Drive Link', icon: Link },
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
            <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-4">Form Elements</h3>
              
              <Droppable droppableId="palette" isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-600 mb-2">Basic Fields</div>
                      {componentPalette.slice(0, 6).map((component, index) => (
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
                      
                      <div className="text-sm font-medium text-gray-600 mb-2 mt-4">Selection Fields</div>
                      {componentPalette.slice(6, 9).map((component, index) => (
                        <Draggable key={component.type} draggableId={component.type} index={index + 6}>
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
                      
                      <div className="text-sm font-medium text-gray-600 mb-2 mt-4">Document Fields</div>
                      {componentPalette.slice(9, 12).map((component, index) => (
                        <Draggable key={component.type} draggableId={component.type} index={index + 9}>
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
                      
                      {['text', 'textarea', 'email'].includes(selectedElementData.type) && (
                        <div>
                          <Label htmlFor="placeholder">Placeholder Text</Label>
                          <Input
                            id="placeholder"
                            value={selectedElementData.placeholder || ''}
                            onChange={(e) => updateElement(selectedElementData.id, { placeholder: e.target.value })}
                            className="mt-1"
                          />
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
                      
                      {['radio', 'checkbox', 'select'].includes(selectedElementData.type) && (
                        <div>
                          <Label>Options</Label>
                          <div className="mt-2 space-y-2">
                            {selectedElementData.options?.map((option, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(selectedElementData.options || [])];
                                    newOptions[index] = e.target.value;
                                    updateElement(selectedElementData.id, { options: newOptions });
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newOptions = selectedElementData.options?.filter((_, i) => i !== index);
                                    updateElement(selectedElementData.id, { options: newOptions });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newOptions = [...(selectedElementData.options || []), `Option ${(selectedElementData.options?.length || 0) + 1}`];
                                updateElement(selectedElementData.id, { options: newOptions });
                              }}
                            >
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}
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
