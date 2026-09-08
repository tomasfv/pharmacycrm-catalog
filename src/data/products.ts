import { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Cuidado Personal", image: "/placeholder.svg" },
  { id: "2", name: "Perfumería", image: "/placeholder.svg" },
  { id: "3", name: "Dermocosmética", image: "/placeholder.svg" },
  { id: "4", name: "Regalería", image: "/placeholder.svg" },
  { id: "5", name: "Suplementos", image: "/placeholder.svg" },
  { id: "6", name: "Medicamentos", image: "/placeholder.svg" },
];

export const products: Product[] = [
  // ── Cuidado Personal ──
  { id: "1", categoryId: "1", name: "Shampoo Nutritivo 400ml", description: "Shampoo enriquecido con keratina para cabello dañado. Limpia suavemente mientras repara y fortalece cada hebra.", price: 2800, image: "/placeholder.svg" },
  { id: "2", categoryId: "1", name: "Jabón Líquido Corporal 500ml", description: "Jabón líquido con extracto de aloe vera. Hidrata y limpia la piel sin resecar. Dermatológicamente testado.", price: 2200, image: "/placeholder.svg" },
  { id: "3", categoryId: "1", name: "Desodorante Roll-On 50ml", description: "Protección 48 horas sin alcohol. Fórmula suave para piel sensible. Sin colorantes.", price: 1900, image: "/placeholder.svg" },
  { id: "4", categoryId: "1", name: "Crema Hidratante Corporal 200ml", description: "Crema con manteca de karité y vitamina E. Absorción rápida, piel suave por 24 horas.", price: 3500, image: "/placeholder.svg" },
  { id: "5", categoryId: "1", name: "Pasta Dental Blanqueadora 90g", description: "Fórmula con flúor y micro-partículas de limpieza. Elimina manchas y protege contra las caries.", price: 1800, image: "/placeholder.svg" },
  { id: "6", categoryId: "1", name: "Gel de Ducha Energizante 750ml", description: "Gel de ducha con menta y eucalipto. Sensación de frescura y energía durante todo el día.", price: 2600, image: "/placeholder.svg" },
  { id: "7", categoryId: "1", name: "Crema de Manos 100ml", description: "Protección intensiva para manos secas. Con urea y vitamina B5. No deja sensación grasa.", price: 1500, image: "/placeholder.svg" },

  // ── Perfumería ──
  { id: "8", categoryId: "2", name: "Perfume Uomo Eau de Toilette 100ml", description: "Fragancia masculina con notas de bergamota, lavanda y sándalo. Elegancia y frescura.", price: 18500, image: "/placeholder.svg" },
  { id: "9", categoryId: "2", name: "Perfume Femme Eau de Parfum 75ml", description: "Fragancia femenina con notas de rosa, jazmín y vainilla. Sofisticación y dulzura.", price: 21000, image: "/placeholder.svg" },
  { id: "10", categoryId: "2", name: "Colonia Herbal 200ml", description: "Colonia con lavanda, romero y ciprés. Frescura natural para el día a día.", price: 8500, image: "/placeholder.svg" },
  { id: "11", categoryId: "2", name: "Agua de Toilette Fresh 150ml", description: "Fragancia ligera con cítricos y notas acuáticas. Ideal para uso diario.", price: 12000, image: "/placeholder.svg" },
  { id: "12", categoryId: "2", name: "Body Splash Frutal 250ml", description: "Body spray con aroma a frutas tropicales. Refrescante y duradero.", price: 6500, image: "/placeholder.svg" },
  { id: "13", categoryId: "2", name: "Perfume Unisex Madera 50ml", description: "Fragancia artesanal con notas de madera de rosa, pachulí y ámbar.", price: 15000, image: "/placeholder.svg" },

  // ── Dermocosmética ──
  { id: "14", categoryId: "3", name: "Protector Solar FPS 50 150ml", description: "Protección UVA/UVB de amplio espectro. Textura ligera, no deja residuos blancos.", price: 7800, image: "/placeholder.svg" },
  { id: "15", categoryId: "3", name: "Sérum Vitamina C 30ml", description: "Sérum concentrado con 20% de vitamina C pura. Antioxidante, ilumina y uniformiza el tono.", price: 12500, image: "/placeholder.svg" },
  { id: "16", categoryId: "3", name: "Crema Anti-Age 50ml", description: "Crema con retinol y ácido hialurónico. Reduce líneas de expresión y mejora la elasticidad.", price: 15200, image: "/placeholder.svg" },
  { id: "17", categoryId: "3", name: "Loción Hidratante Facial 200ml", description: "Hidratación diaria con ceramidas y niacinamida. Piel suave y protegida.", price: 6800, image: "/placeholder.svg" },
  { id: "18", categoryId: "3", name: "Agua Micelar 400ml", description: "Limpia y desmaquilla sin enjuague. Para todo tipo de piel, incluso sensible.", price: 4500, image: "/placeholder.svg" },
  { id: "19", categoryId: "3", name: "Contorno de Ojos 15ml", description: "Fórmula con cafeína y péptidos. Reduce ojeras, bolsas y líneas de expresión.", price: 9800, image: "/placeholder.svg" },

  // ── Regalería ──
  { id: "20", categoryId: "4", name: "Vela Aromática Lavanda 200g", description: "Vela de cera de soja con esencia de lavanda. Duración approx. 40 horas.", price: 4200, image: "/placeholder.svg" },
  { id: "21", categoryId: "4", name: "Taza Cerámica Farmacia 350ml", description: "Taza de cerámica con diseño vintage de farmacia. Apto lavavajillas y microondas.", price: 3800, image: "/placeholder.svg" },
  { id: "22", categoryId: "4", name: "Caja de Bombones Artesanales 200g", description: "Selección de bombones de chocolate con rellenos variados. Caja premium.", price: 5500, image: "/placeholder.svg" },
  { id: "23", categoryId: "4", name: "Estuche de Crema Manos + Labios", description: "Set de regalo con crema de manos y bálsamo labial en estuche de cartón.", price: 4800, image: "/placeholder.svg" },
  { id: "24", categoryId: "4", name: "Juego de Jabones Artesanales x3", description: "Tres jabones naturales: avena, miel y carbón activo. Envoltorio de kraft.", price: 3600, image: "/placeholder.svg" },
  { id: "25", categoryId: "4", name: "Diffuser de Aromas 100ml", description: "Difusor con palitos de rattan. Fragancia a vainilla y canela. Dura hasta 30 días.", price: 5200, image: "/placeholder.svg" },

  // ── Suplementos ──
  { id: "26", categoryId: "5", name: "Vitamina C 1g x 30 comprimidos", description: "Suplemento de vitamina C en comprimidos efervescentes. Refuerza las defensas.", price: 3200, image: "/placeholder.svg" },
  { id: "27", categoryId: "5", name: "Omega 3 - 60 cápsulas blandas", description: "Ácidos grasos esenciales EPA y DHA. Salud cardiovascular y cerebral.", price: 5800, image: "/placeholder.svg" },
  { id: "28", categoryId: "5", name: "Colágeno Hidrolizado 300g", description: "Colágeno hidrolizado en polvo. Mejora la elasticidad de la piel, cabello y uñas.", price: 6500, image: "/placeholder.svg" },
  { id: "29", categoryId: "5", name: "Magnesio + B6 - 60 comprimidos", description: "Magnesio quelado con vitamina B6. Contribuye a la reducción del cansancio.", price: 4100, image: "/placeholder.svg" },
  { id: "30", categoryId: "5", name: "Vitamina D3 2000 UI - 60 cápsulas", description: "Vitamina D3 en cápsulas blandas. Apoya la salud ósea e inmunológica.", price: 3900, image: "/placeholder.svg" },
  { id: "31", categoryId: "5", name: "Probióticos 10 cepas - 30 cápsulas", description: "Probióticos de alta potencia con 10 cepas. Flora intestinal saludable.", price: 5200, image: "/placeholder.svg" },
  { id: "32", categoryId: "5", name: "Omegafort DHA - 30 cápsulas", description: "Concentrado de DHA para salud visual y cognitiva. Ideales para estudiantes.", price: 4800, image: "/placeholder.svg" },

  // ── Medicamentos ──
  { id: "33", categoryId: "6", name: "Paracetamol 500mg x 20 comprimidos", description: "Analgésico y antipirético. Alivia dolores leves a moderados y fiebre.", price: 1200, image: "/placeholder.svg" },
  { id: "34", categoryId: "6", name: "Ibuprofeno 400mg x 20 comprimidos", description: "Antiinflamatorio no esteroideo. Alivia dolor, inflamación y fiebre.", price: 1500, image: "/placeholder.svg" },
  { id: "35", categoryId: "6", name: "Omeprazol 20mg x 28 cápsulas", description: "Inhibidor de la bomba de protones. Reduce la acidez estomacal.", price: 3800, image: "/placeholder.svg" },
  { id: "36", categoryId: "6", name: "Losartan 50mg x 30 comprimidos", description: "Antihipertensivo. Tratamiento de la presión arterial elevada.", price: 4200, image: "/placeholder.svg" },
  { id: "37", categoryId: "6", name: "Amoxicilina 500mg x 21 cápsulas", description: "Antibiótico de amplio espectro. Tratamiento de infecciones bacterianas.", price: 5600, image: "/placeholder.svg" },
  { id: "38", categoryId: "6", name: "Naproxeno 250mg x 20 comprimidos", description: "Antiinflamatorio. Alivia dolor articular, muscular y dental.", price: 2800, image: "/placeholder.svg" },
  { id: "39", categoryId: "6", name: "Loratadina 10mg x 10 comprimidos", description: "Antihistamínico. Alivia síntomas de alergia nasal y urticaria.", price: 2100, image: "/placeholder.svg" },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
