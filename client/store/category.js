const GET_CATEGORY = 'GET_CATEGORY';

export const getCategory = category => ({ type: GET_CATEGORY, category })

export default function reducer (category = '', action){
    switch (action.type){
        case GET_CATEGORY:
            return action.category;

        default:
            return category;
    }
}
