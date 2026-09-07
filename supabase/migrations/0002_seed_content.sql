-- Medicaris — contenu de départ (domaines cliniques + équipements)
-- Porté depuis site/index.html. À coller dans Supabase SQL Editor → Run.

insert into clinical_domains (slug, icon_key, tag_fr, tag_en, title_fr, title_en, body_fr, body_en, audience_fr, audience_en, order_index) values
('proctologie', 'proctologie', 'Proctologie', 'Proctology',
 'Hémorroïdes, fistule, fissure, sinus pilonidal', 'Haemorrhoids, fistula, fissure, pilonidal sinus',
 'Laser diode ou radiofréquence introduits au contact de la lésion sous anesthésie locale. Le tissu est coagulé et rétracté sans résection, ce qui préserve la fonction du coussinet hémorroïdaire et du sphincter.',
 'Diode laser or radiofrequency applied directly to the lesion under local anaesthesia. Tissue is coagulated and retracted without resection, preserving haemorrhoidal cushion and sphincter function.',
 'Proctologues · chirurgiens viscéraux et digestifs', 'Proctologists · visceral and digestive surgeons', 1),

('phlebologie', 'phlebologie', 'Phlébologie', 'Phlebology',
 'Varices et insuffisance veineuse', 'Varicose veins and venous insufficiency',
 'Ablation endoveineuse par radiofréquence de la grande et de la petite saphène ainsi que des perforantes. Cathéter positionné sous échoguidage, occlusion segmentaire contrôlée en température.',
 'Endovenous radiofrequency ablation of the great and small saphenous veins and perforators. Catheter positioned under ultrasound guidance, temperature-controlled segmental occlusion.',
 'Phlébologues · chirurgiens vasculaires', 'Phlebologists · vascular surgeons', 2),

('urologie', 'urologie', 'Urologie', 'Urology',
 'Hypertrophie bénigne de la prostate et lithiase urinaire', 'Benign prostatic hyperplasia and urinary stones',
 'Fibre laser introduite par voie endoscopique pour la vaporisation ou l''énucléation du tissu prostatique, et pour la fragmentation des calculs urinaires. Geste réalisé sans incision, avec un temps de sondage réduit.',
 'Laser fibre introduced endoscopically for vaporisation or enucleation of prostatic tissue, and for fragmentation of urinary stones. Performed without incision, with reduced catheterisation time.',
 'Urologues', 'Urologists', 3),

('ablation-tissulaire', 'ablation', 'Ablation tissulaire', 'Tissue ablation',
 'Coagulation percutanée et peropératoire', 'Percutaneous and intraoperative coagulation',
 'Générateur multi-canal et électrodes refroidies pour la coagulation de tissu par voie percutanée, cœlioscopique ou peropératoire. Retour d''impédance en temps réel pour éviter la carbonisation.',
 'Multi-channel generator and cooled electrodes for tissue coagulation via percutaneous, laparoscopic or intraoperative routes. Real-time impedance feedback prevents carbonisation.',
 'Radiologues interventionnels · chirurgiens oncologiques', 'Interventional radiologists · oncological surgeons', 4);

insert into equipment (slug, energy_type, clinical_domain_id, eyebrow_fr, eyebrow_en, name_fr, name_en, description_fr, description_en, tags, order_index) values

('rf-endoveineux', 'rf', (select id from clinical_domains where slug = 'phlebologie'),
 'Ablation endoveineuse par radiofréquence', 'Endovenous radiofrequency ablation',
 'Système RF endoveineux', 'Endovenous RF System',
 'Traitement de l''insuffisance veineuse superficielle par occlusion thermique. Le cathéter est monté sous échoguidage, puis la veine est traitée par segments successifs, avec affichage en temps réel de la température et du temps de cycle.',
 'Treatment of superficial venous insufficiency by thermal occlusion. The catheter is advanced under ultrasound guidance, then the vein is treated segment by segment, with real-time display of temperature and cycle time.',
 '[{"fr":"Grande saphène","en":"Great saphenous vein"},{"fr":"Petite saphène","en":"Small saphenous vein"},{"fr":"Perforantes","en":"Perforators"}]'::jsonb, 1),

('rfa-hemorroides-fistule', 'rf', (select id from clinical_domains where slug = 'proctologie'),
 'Radiofréquence proctologique', 'Proctology radiofrequency',
 'RFA hémorroïdes & fistule anale', 'RFA Haemorrhoid & Anal Fistula',
 'L''électrode délivre l''énergie sur la paroi interne de la lésion. La dénaturation des protéines entraîne coagulation puis atrophie du tissu ; la nécrose obtenue est stérile et laisse place à un tissu de granulation qui referme le trajet fistuleux.',
 'The electrode delivers energy to the inner wall of the lesion. Protein denaturation causes coagulation then tissue atrophy; the resulting necrosis is sterile and gives way to granulation tissue that closes the fistula tract.',
 '[{"fr":"Hémorroïdes internes","en":"Internal haemorrhoids"},{"fr":"Hémorroïdes mixtes","en":"Mixed haemorrhoids"},{"fr":"Fistule anale","en":"Anal fistula"},{"fr":"Chirurgie du sphincter","en":"Sphincter surgery"}]'::jsonb, 2),

('generateur-rf-multicanal', 'rf', (select id from clinical_domains where slug = 'ablation-tissulaire'),
 'Générateur d''ablation par radiofréquence', 'Radiofrequency ablation generator',
 'Générateur RF multi-canal', 'Multi-channel RF generator',
 'Générateur multi-canal destiné à la coagulation de tissu par voie percutanée, cœlioscopique ou peropératoire. Le pilotage multi-électrodes permet une ablation conforme au volume visé, et le retour d''impédance en temps réel prévient la carbonisation.',
 'Multi-channel generator for tissue coagulation via percutaneous, laparoscopic or intraoperative routes. Multi-electrode control allows ablation conforming to the target volume, and real-time impedance feedback prevents carbonisation.',
 '[{"fr":"Voie percutanée","en":"Percutaneous"},{"fr":"Cœlioscopie","en":"Laparoscopic"},{"fr":"Peropératoire","en":"Intraoperative"},{"fr":"Hémostase","en":"Haemostasis"}]'::jsonb, 3),

('laser-bi-longueur-onde', 'laser', (select id from clinical_domains where slug = 'proctologie'),
 'Laser chirurgical diode', 'Surgical diode laser',
 'Laser bi-longueur d''onde', 'Dual-wavelength laser',
 'Plateforme laser bi-longueur d''onde dédiée à la proctologie. La fibre est introduite au contact de la lésion et l''énergie est délivrée de façon contrôlée, sans exérèse. Le 1470 nm, fortement absorbé par l''eau, est privilégié pour l''hémorroïde et la fistule ; le 980 nm apporte la polyvalence sur les gestes de contact.',
 'Dual-wavelength laser platform dedicated to proctology. The fibre is introduced in contact with the lesion and energy is delivered in a controlled manner, without excision. The 1470 nm wavelength, strongly absorbed by water, is preferred for haemorrhoids and fistula; 980 nm adds versatility for contact procedures.',
 '[{"fr":"Hémorroïdes","en":"Haemorrhoids"},{"fr":"Fistule anale","en":"Anal fistula"},{"fr":"Fissure anale","en":"Anal fissure"},{"fr":"Sinus pilonidal","en":"Pilonidal sinus"}]'::jsonb, 4);
