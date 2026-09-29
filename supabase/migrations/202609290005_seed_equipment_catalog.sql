insert into public.equipment (internal_code, name, category, brand, model, notes)
values
  ('EQ-001', 'Titan de 18 toneladas', 'lifting', 'TEREX', 'BT3470', 'Capacidad de hasta 18 toneladas. Montaje de tuberías, ductos, estructuras, cimentaciones y transporte de carga pesada.'),
  ('EQ-002', 'Generador a gasolina Miller', 'power', 'MILLER', 'BOBCAT', 'Generación de electricidad para trabajos en campo y taller.'),
  ('EQ-003', 'Máquina para soldar Lincoln Electric', 'welding', 'LINCOLN ELECTRIC', 'RX 550 PRO', 'Soldadura para fabricación, reparación y montaje.'),
  ('EQ-004', 'Compresor de aire', 'air', 'SULLIVAN PALATEK', '185 FCM', 'Aplicación de pintura y apoyo a trabajos industriales.'),
  ('EQ-005', 'Camioneta Ford F350', 'transport', 'FORD', 'F350', 'Transporte de carga, equipo y personal de trabajo.'),
  ('EQ-006', 'Remolque', 'transport', 'REMSA', '001', 'Transporte de carga y equipo.'),
  ('EQ-007', 'Generador a gasolina Predator', 'power', 'PREDATOR', '9000', 'Generación de electricidad para operaciones de campo.'),
  ('EQ-008', 'Máquina para soldar INFRA', 'welding', 'INFRA', 'MI 2-300', 'Aplicación de soldadura.'),
  ('EQ-009', 'Perforadora industrial ZL140', 'drilling', 'ZOOMLION', 'ZL140', 'Perforación de cimentaciones.')
on conflict (internal_code) do nothing;
