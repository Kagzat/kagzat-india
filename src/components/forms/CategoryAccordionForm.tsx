import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Download, FileText, User, MapPin, GraduationCap, Briefcase, CreditCard, Home, Package } from 'lucide-react';
import { formFieldLibrary, formatFieldName, validateField } from '@/lib/formLibrary';
import { useToast } from '@/hooks/use-toast';

const categoryIcons = {
  Identity: User,
  Address: MapPin,
  Education: GraduationCap,
  Work: Briefcase,
  Finances: CreditCard,
  Property: Home,
  Miscellaneous: Package,
};

const CategoryAccordionForm = () => {
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleFieldChange = (category: string, fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [fieldName]: value
      }
    }));

    // Clear error when user starts typing
    const errorKey = `${category}.${fieldName}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formFieldLibrary).forEach(([category, fields]) => {
      fields.forEach(field => {
        const value = formData[category]?.[field.name] || '';
        if (value) { // Only validate if field has value
          const error = validateField(field.name, value, category as keyof typeof formFieldLibrary);
          if (error) {
            newErrors[`${category}.${field.name}`] = error;
            isValid = false;
          }
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      toast({
        title: "Form saved successfully",
        description: "Your data has been saved.",
      });
    } else {
      toast({
        title: "Validation errors",
        description: "Please fix the errors before saving.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFilledFieldsCount = (category: string) => {
    const categoryData = formData[category] || {};
    return Object.values(categoryData).filter(value => value && value.trim() !== '').length;
  };

  const getTotalFieldsCount = (category: string) => {
    return formFieldLibrary[category as keyof typeof formFieldLibrary].length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Document Categories Form</CardTitle>
              <p className="text-muted-foreground mt-1">
                Fill out information across different categories. Expand each category to view and edit fields.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Form
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Category Accordions */}
      <Accordion type="multiple" className="space-y-4">
        {Object.entries(formFieldLibrary).map(([category, fields]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons] || FileText;
          const filledCount = getFilledFieldsCount(category);
          const totalCount = getTotalFieldsCount(category);
          const completionPercentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

          return (
            <AccordionItem key={category} value={category} className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-lg">{category}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={completionPercentage > 0 ? "default" : "secondary"}>
                      {filledCount}/{totalCount} fields
                    </Badge>
                    {completionPercentage > 0 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {completionPercentage}% complete
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-medium text-sm">Field Name</span>
                      <span className="font-medium text-sm">Value</span>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {fields.map((field, index) => {
                      const fieldValue = formData[category]?.[field.name] || '';
                      const errorKey = `${category}.${field.name}`;
                      const hasError = !!errors[errorKey];
                      
                      return (
                        <div key={field.name} className={`grid grid-cols-2 gap-4 p-4 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                          <div className="space-y-1">
                            <Label htmlFor={`${category}-${field.name}`} className="text-sm font-medium">
                              {formatFieldName(field.name)}
                            </Label>
                            <div className="text-xs text-muted-foreground">
                              {field.min_length}-{field.max_length} characters
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Input
                              id={`${category}-${field.name}`}
                              value={fieldValue}
                              onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                              placeholder={`Enter ${formatFieldName(field.name).toLowerCase()}`}
                              className={hasError ? 'border-destructive' : ''}
                            />
                            {hasError && (
                              <p className="text-xs text-destructive">{errors[errorKey]}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CategoryAccordionForm;