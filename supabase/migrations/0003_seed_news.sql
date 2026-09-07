-- Medicaris — 4 actualités d'exemple, portées de site/resources-data.js
-- Contenu explicitement placeholder (« Exemple d'actualité »), à remplacer
-- par du vrai contenu via l'admin dès qu'il est disponible.
-- À coller dans Supabase SQL Editor → Run.

insert into articles (slug, title_fr, title_en, excerpt_fr, excerpt_en, content_fr, content_en, published, published_at) values

('nouvelle-configuration-disponible',
 'Exemple d''actualité — nouvelle configuration disponible', 'Sample news — new configuration available',
 'Emplacement réservé pour annoncer une nouvelle configuration d''équipement ou un ajout à la gamme distribuée.',
 'Placeholder for announcing a new equipment configuration or an addition to the distributed range.',
 '<p>Emplacement réservé pour annoncer une nouvelle configuration d''équipement ou un ajout à la gamme distribuée. Ce texte sera remplacé par un vrai contenu dès qu''il sera disponible.</p>',
 '<p>Placeholder for announcing a new equipment configuration or an addition to the distributed range. This text will be replaced with real content once available.</p>',
 true, '2026-07-15T09:00:00Z'),

('retour-experience-clinique',
 'Exemple d''actualité — retour d''expérience clinique', 'Sample news — clinical feedback',
 'Emplacement réservé pour partager un retour d''expérience d''une clinique partenaire, une fois autorisé par l''établissement concerné.',
 'Placeholder for sharing feedback from a partner clinic, once authorised by the institution concerned.',
 '<p>Emplacement réservé pour partager un retour d''expérience d''une clinique partenaire, une fois autorisé par l''établissement concerné.</p>',
 '<p>Placeholder for sharing feedback from a partner clinic, once authorised by the institution concerned.</p>',
 true, '2026-06-02T09:00:00Z'),

('extension-gamme-consommables',
 'Exemple d''actualité — extension de la gamme de consommables', 'Sample news — consumables range extension',
 'Emplacement réservé pour annoncer un nouveau format de consommable (fibres, cathéters, électrodes) disponible au stock.',
 'Placeholder for announcing a new consumable format (fibres, catheters, electrodes) available in stock.',
 '<p>Emplacement réservé pour annoncer un nouveau format de consommable (fibres, cathéters, électrodes) disponible au stock.</p>',
 '<p>Placeholder for announcing a new consumable format (fibres, catheters, electrodes) available in stock.</p>',
 true, '2026-04-20T09:00:00Z'),

('mise-a-jour-protocole-formation',
 'Exemple d''actualité — mise à jour du protocole de formation', 'Sample news — training protocol update',
 'Emplacement réservé pour détailler une évolution du parcours de formation proposé aux équipes de bloc.',
 'Placeholder for detailing an update to the training path offered to theatre teams.',
 '<p>Emplacement réservé pour détailler une évolution du parcours de formation proposé aux équipes de bloc.</p>',
 '<p>Placeholder for detailing an update to the training path offered to theatre teams.</p>',
 true, '2026-02-10T09:00:00Z');
