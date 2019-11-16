export const SAVE_TO_STORAGE = 'SAVE_TO_STORAGE';

export const saveToStorage = (data)=>{
    
    return{
        type:SAVE_TO_STORAGE,
        data
    }
}