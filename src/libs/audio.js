let newMsg = null;

export const playNewMsg = () => {
    if(newMsg==null){
        newMsg = new Audio();
        newMsg.src='/static/mp3/newMsg.mp3';
    }
    newMsg.play();
}