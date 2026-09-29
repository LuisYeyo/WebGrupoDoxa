update public.work_locations
set
  company_name = 'Grupo Industrial DOXA · Grupo Industrial REMSA',
  city = coalesce(city, 'Altamira'),
  state = coalesce(state, 'Tamaulipas'),
  notes = coalesce(notes, 'Ubicación principal de las instalaciones operativas de DOXA y REMSA. Área especializada para fabricación en acero inoxidable y acero al carbón.')
where kind = 'company_workshop' and workshop_number = 1;

update public.work_locations
set
  company_name = 'Grupo Industrial DOXA · Grupo Industrial REMSA',
  city = coalesce(city, 'Altamira'),
  state = coalesce(state, 'Tamaulipas'),
  notes = coalesce(notes, 'Ubicación principal de las instalaciones operativas de DOXA y REMSA. Área preparada para fabricación, maniobras y trabajos de mayor escala.')
where kind = 'company_workshop' and workshop_number = 2;

update public.work_locations
set
  company_name = 'SECMIMAR · Mantenimiento Industrial DOXA',
  city = coalesce(city, 'Altamira'),
  state = coalesce(state, 'Tamaulipas'),
  notes = coalesce(notes, 'Ubicación de SECMIMAR y Mantenimiento Industrial DOXA, especializada en equipo industrial, soldadura, preparación superficial, sandblast y pintura.')
where kind = 'company_workshop' and workshop_number = 3;
