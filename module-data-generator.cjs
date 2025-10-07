const fs = require('fs');

// Sprawdzenie czy plik module-data.js już istnieje
if (fs.existsSync('./module-data.js')) {
    console.log('Plik module-data.js już istnieje. Skrypt zostanie przerwany.');
    process.exit(0);
}

const count = Number(process.argv[2]); // odczyt liczby obiektów

// Sprawdzenie czy podano liczbę obiektów
if (!count || count <= 0) {
    console.error('Podaj liczbę obiektów jako parametr: node module-data-generator.cjs 5');
    process.exit(1);
}

let names = [];                        // tablica z imionami 

// Funkcja do generowania losowej daty urodzenia (wiek 18-65 lat)
function generateRandomBirthDate() {
    const today = new Date();
    const minAge = 18;
    const maxAge = 65;
    
    const birthYear = today.getFullYear() - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1; // maksymalnie 28 dni żeby uniknąć problemów z lutym
    
    return `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
}

// Funkcja do generowania losowego numeru telefonu
function generateRandomPhone() {
    const area = Math.floor(Math.random() * 900) + 100; // 100-999
    const middle = Math.floor(Math.random() * 900) + 100; // 100-999
    const last = Math.floor(Math.random() * 900) + 100; // 100-999
    return `${area}-${middle}-${last}`;
}

// Funkcja do generowania emaila na podstawie imienia
function generateEmail(name, nameCount) {
    const emailName = name.toLowerCase();
    const suffix = nameCount > 1 ? nameCount : '';
    return `${emailName}${suffix}@wsei.edu.pl`;
}

fs.readFile('./names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Błąd odczytu pliku names.txt:', err);
        return;
    }
    
    // Podział łańcucha z imionami na wiersze
    names = data.split("\n").map(s => s.trim()).filter(n => n.length != 0);
    console.log('Dostępne imiona:', names);
    
    const nameCounters = {}; // Liczniki dla imion (do generowania unikalnych emaili)
    let content = "export const people = [\n";
    
    for(let i = 0; i < count; i++){
        // Losowanie imienia z biblioteki imion
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        // Zwiększenie licznika dla danego imienia
        nameCounters[randomName] = (nameCounters[randomName] || 0) + 1;
        
        const person = {
            id: i + 1,
            name: randomName,
            birthDate: generateRandomBirthDate(),
            email: generateEmail(randomName, nameCounters[randomName]),
            phone: generateRandomPhone()
        };
        
        content += `    {\n`;
        content += `        id: ${person.id},\n`;
        content += `        name: "${person.name}",\n`;
        content += `        birthDate: "${person.birthDate}",\n`;
        content += `        email: "${person.email}",\n`;
        content += `        phone: "${person.phone}"\n`;
        content += `    }`;
        
        // Dodanie przecinka dla wszystkich elementów oprócz ostatniego
        if (i < count - 1) {
            content += ',';
        }
        content += '\n';
    }
    
    content += "];"
    
    // Zapis łańcucha do pliku 
    fs.writeFile('module-data.js', content, (err) => {
        if (err) {
           console.error('Błąd zapisu pliku:', err);
           return;
        }
        console.log(`Plik module-data.js został wygenerowany z ${count} obiektami osób.`);
    });
});
