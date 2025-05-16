export function getInstructorImage(
    name: string,
    ext: string = "webp",          // jpeg, png vs. geçerse de çalışsın
  ) {
    const fileName = name
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")    // aksanları sil
      .replace(/\s+/g, "_")               // tüm boşluk kümelerini "_"
      .replace(/-/g, "_")                 // tire → alt çizgi
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\./g, "")
      .replace(/[^a-z0-9_]/g, "");        // kalan tüm özel karakterleri at
  
    return `/images/instructors/${fileName}.${ext}`;
  }
  