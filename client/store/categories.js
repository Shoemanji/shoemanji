const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = categories => ({ type: GET_CATEGORIES, categories })

export default function reducer (categories = [], action){
    switch (action.type){
        case GET_CATEGORIES:
            return action.categories;

        default:
            return categories;
    }
}
