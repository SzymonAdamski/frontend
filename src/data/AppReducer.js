export default function AppReducer(state, action) {
    switch(action.type) {
        case "check":
            // Zmienia stan zaznaczenia osoby - tworzy nową tablicę z zaktualizowanym obiektem
            return state.map(person => 
                person.id === action.id 
                    ? { ...person, isChecked: !person.isChecked }
                    : person
            );
        
        case "rate":
            // Zmienia rating osoby - logika: 0→1→2→...→10→0
            return state.map(person => 
                person.id === action.id 
                    ? { 
                        ...person, 
                        rating: person.rating === 10 ? 0 : person.rating === 0 ? 1 : Math.min(person.rating + 1, 10)
                      }
                    : person
            );
        
        case "delete":
            // Usuwa osobę z listy - tworzy nową tablicę bez wskazanego elementu
            return state.filter(person => person.id !== action.id);
        
        default:
            return state;
    }
}
