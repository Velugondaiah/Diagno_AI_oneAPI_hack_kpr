export const stopSpeech = () => {
    window.speechSynthesis.cancel();
};

export const pauseSpeech = () => {
    window.speechSynthesis.pause();
};

export const resumeSpeech = () => {
    window.speechSynthesis.resume();
}; 