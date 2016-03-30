const initialState = [
    {
        id:0,
        name:'cath1',
        itemsIds:[1, 3, 4]
    },
    {
        id:1,
        name:'cath2',
        itemsIds:[0, 2, 5]
    }
];

export default function cathegories(state = initialState, action={}) {
    switch (action.type) {
        case 'SET_ACTIVE':
            return { ...state,
                currentItem: {
                    id: action.payload,
                    name: "lll"
                }
            };

        default:
            return state;
    }
}