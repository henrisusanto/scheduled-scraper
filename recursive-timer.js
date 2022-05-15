function doSomething (seconds) {
    setTimeout(() => {
        console.log(new Date())
        doSomething(seconds);
    }, seconds)
}

doSomething(10000)