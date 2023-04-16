import app from "./app.js";

app.listen(app.get("PORT"));
function cleanAndParseJSON(text) {
    // Limpiar la cadena de texto
    text = text.replace(/\n/g, "").replace(/'/g, "\"");
  
    // Convertir la cadena de texto a un objeto JSON válido
    try {
      return text;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

    

console.log(`Server run http://localhost:${app.get("PORT")}`)
