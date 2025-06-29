export const formFieldLibrary = {
  "Identity": [
    { "name": "first_name", "min_length": 1, "max_length": 50 },
    { "name": "last_name", "min_length": 1, "max_length": 50 },
    { "name": "full_name", "min_length": 3, "max_length": 100 },
    { "name": "date_of_birth", "min_length": 10, "max_length": 10 },
    { "name": "gender", "min_length": 1, "max_length": 10 },
    { "name": "nationality", "min_length": 2, "max_length": 56 },
    { "name": "place_of_birth", "min_length": 2, "max_length": 100 },
    { "name": "marital_status", "min_length": 3, "max_length": 15 },
    { "name": "national_id_number", "min_length": 6, "max_length": 20 },
    { "name": "passport_number", "min_length": 6, "max_length": 9 },
    { "name": "driving_license_number", "min_length": 6, "max_length": 20 },
    { "name": "social_security_number", "min_length": 9, "max_length": 11 },
    { "name": "aadhaar_number", "min_length": 12, "max_length": 12 },
    { "name": "voter_id_number", "min_length": 8, "max_length": 12 }
  ],
  "Address": [
    { "name": "street_address", "min_length": 5, "max_length": 100 },
    { "name": "address_line_1", "min_length": 5, "max_length": 100 },
    { "name": "address_line_2", "min_length": 0, "max_length": 100 },
    { "name": "city", "min_length": 2, "max_length": 50 },
    { "name": "state", "min_length": 2, "max_length": 50 },
    { "name": "province", "min_length": 2, "max_length": 50 },
    { "name": "postal_code", "min_length": 4, "max_length": 10 },
    { "name": "zip_code", "min_length": 4, "max_length": 10 },
    { "name": "country", "min_length": 2, "max_length": 56 },
    { "name": "residency_status", "min_length": 3, "max_length": 30 },
    { "name": "duration_at_address", "min_length": 1, "max_length": 3 }
  ],
  "Education": [
    { "name": "highest_qualification", "min_length": 2, "max_length": 50 },
    { "name": "school_university_name", "min_length": 3, "max_length": 100 },
    { "name": "degree", "min_length": 2, "max_length": 50 },
    { "name": "field_of_study", "min_length": 2, "max_length": 100 },
    { "name": "graduation_year", "min_length": 4, "max_length": 4 },
    { "name": "student_id", "min_length": 4, "max_length": 15 },
    { "name": "marks_percentage", "min_length": 1, "max_length": 5 },
    { "name": "cgpa", "min_length": 1, "max_length": 4 },
    { "name": "education_type", "min_length": 4, "max_length": 25 }
  ],
  "Work": [
    { "name": "employer_name", "min_length": 2, "max_length": 100 },
    { "name": "job_title", "min_length": 2, "max_length": 75 },
    { "name": "employment_type", "min_length": 3, "max_length": 30 },
    { "name": "employee_id", "min_length": 3, "max_length": 15 },
    { "name": "work_email", "min_length": 5, "max_length": 100 },
    { "name": "employment_start_date", "min_length": 10, "max_length": 10 },
    { "name": "employment_end_date", "min_length": 10, "max_length": 10 },
    { "name": "supervisor_name", "min_length": 3, "max_length": 100 },
    { "name": "supervisor_contact", "min_length": 10, "max_length": 15 },
    { "name": "current_salary", "min_length": 3, "max_length": 15 },
    { "name": "department", "min_length": 2, "max_length": 50 }
  ],
  "Finances": [
    { "name": "bank_account_number", "min_length": 8, "max_length": 20 },
    { "name": "account_type", "min_length": 4, "max_length": 20 },
    { "name": "bank_name", "min_length": 2, "max_length": 100 },
    { "name": "ifsc_code", "min_length": 11, "max_length": 11 },
    { "name": "swift_code", "min_length": 8, "max_length": 11 },
    { "name": "income_range", "min_length": 3, "max_length": 20 },
    { "name": "monthly_expenses", "min_length": 2, "max_length": 15 },
    { "name": "tax_id_number", "min_length": 8, "max_length": 15 },
    { "name": "credit_score", "min_length": 3, "max_length": 4 },
    { "name": "debt_status", "min_length": 2, "max_length": 30 }
  ],
  "Property": [
    { "name": "property_type", "min_length": 3, "max_length": 50 },
    { "name": "ownership_status", "min_length": 3, "max_length": 20 },
    { "name": "property_address", "min_length": 5, "max_length": 150 },
    { "name": "purchase_date", "min_length": 10, "max_length": 10 },
    { "name": "current_value", "min_length": 3, "max_length": 20 },
    { "name": "mortgage_status", "min_length": 3, "max_length": 20 },
    { "name": "land_area", "min_length": 2, "max_length": 15 },
    { "name": "built_up_area", "min_length": 2, "max_length": 15 },
    { "name": "occupancy_status", "min_length": 4, "max_length": 30 }
  ],
  "Miscellaneous": [
    { "name": "phone_number", "min_length": 10, "max_length": 15 },
    { "name": "email_address", "min_length": 5, "max_length": 100 },
    { "name": "preferred_contact_method", "min_length": 4, "max_length": 25 },
    { "name": "emergency_contact_name", "min_length": 3, "max_length": 100 },
    { "name": "emergency_contact_number", "min_length": 10, "max_length": 15 }
  ]
};

export const documentLibrary = {
  "Identity": [
    "passport",
    "national_id_card", 
    "driving_license",
    "social_security_card",
    "aadhaar_card",
    "voter_id_card",
    "birth_certificate",
    "citizenship_certificate"
  ],
  "Address": [
    "utility_bill",
    "bank_statement",
    "lease_agreement",
    "property_tax_receipt",
    "driver_license_with_address",
    "voter_id_with_address",
    "aadhaar_card",
    "residency_certificate"
  ],
  "Education": [
    "school_marksheet",
    "university_marksheet",
    "diploma_certificate", 
    "degree_certificate",
    "transcript",
    "student_id_card",
    "course_completion_certificate",
    "letter_of_enrollment"
  ],
  "Work": [
    "employment_letter",
    "offer_letter",
    "experience_letter",
    "employee_id_card",
    "salary_slip",
    "form_16",
    "promotion_letter",
    "resignation_letter"
  ],
  "Finances": [
    "bank_passbook",
    "cheque_copy",
    "credit_card_statement",
    "income_tax_return",
    "form_16",
    "investment_statement",
    "loan_approval_letter",
    "tax_deduction_certificate"
  ],
  "Property": [
    "property_sale_deed",
    "property_registration_certificate",
    "property_tax_receipt",
    "encumbrance_certificate",
    "electricity_bill",
    "water_bill",
    "mortgage_deed",
    "occupancy_certificate"
  ],
  "Miscellaneous": [
    "passport_photograph",
    "notarized_affidavit",
    "court_decree",
    "power_of_attorney",
    "signed_application_form"
  ]
};

// Helper function to format field names for display
export const formatFieldName = (fieldName: string): string => {
  return fieldName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to format document names for display
export const formatDocumentName = (documentName: string): string => {
  return documentName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Validation helper
export const validateField = (fieldName: string, value: string, category: keyof typeof formFieldLibrary): string | null => {
  const field = formFieldLibrary[category].find(f => f.name === fieldName);
  if (!field) return null;
  
  if (value.length < field.min_length) {
    return `${formatFieldName(fieldName)} must be at least ${field.min_length} characters`;
  }
  
  if (value.length > field.max_length) {
    return `${formatFieldName(fieldName)} must be at most ${field.max_length} characters`;
  }
  
  return null;
};
