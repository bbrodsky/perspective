/* -----------------    ACTIONS     ------------------ */

const SET_LINKS = 'SET_LINKS'

/* ------------   ACTION CREATORS     ------------------ */

export const setLinks = links => ({
  type: SET_LINKS,
  links
})

/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {
  switch (action.type){
    case SET_LINKS:
        return action.links

    default:
        return state;
    }
};

/* ------------       DISPATCHERS     ------------------ */



export default reducer
