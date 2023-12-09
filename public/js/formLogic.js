
export const formLogic = (data, formElements, socket) => {
    let { players, dots } = data;
    if (Object.keys(players).length === 1 && Object.keys(dots).length === 0) {     
            formElements.dotsInput.value = 1000
            formElements.mapSizeInput.value = 2000
            formElements.velocityInput.value = 1
            formElements.FPSInput.value = 60
                 
        formElements.startButton.onclick = () => {
            let formData = {
                dotsNum: +formElements.dotsInput.value,
                mapSize: +formElements.mapSizeInput.value,
                velocityForm: +formElements.velocityInput.value,
                FPSform: +formElements.FPSInput.value,
            };           
            socket.emit("form data", formData);
        };
    } else {
        formElements.form.style.display = "none"
    }
};

