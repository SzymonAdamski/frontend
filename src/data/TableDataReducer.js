export default function TableDataReducer(state, action) {
    switch(action.type) {
        case "sortUserAsc":
            return [...state].sort((a, b) => 
                (a.user?.name || '').localeCompare(b.user?.name || '')
            );
        
        case "sortUserDesc":
            return [...state].sort((a, b) => 
                (b.user?.name || '').localeCompare(a.user?.name || '')
            );
        
        case "sortPostAsc":
            return [...state].sort((a, b) => 
                (a.post?.title || '').localeCompare(b.post?.title || '')
            );
        
        case "sortPostDesc":
            return [...state].sort((a, b) => 
                (b.post?.title || '').localeCompare(a.post?.title || '')
            );
        
        case "sortCommentsAsc":
            return [...state].sort((a, b) => 
                a.comments.length - b.comments.length
            );
        
        case "sortCommentsDesc":
            return [...state].sort((a, b) => 
                b.comments.length - a.comments.length
            );
        
        case "resetOrder":
            // Zwraca dane w oryginalnej kolejności
            return action.originalData;
        
        default:
            return state;
    }
}
