export const SET_PERSON_PARAMETER ='SET_PERSON_PARAMETER'

export const setPersonParameter =(parameter,value) =>({
    type:SET_PERSON_PARAMETER,
    parameter,
    value
})