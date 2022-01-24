
function handleSubmit(event) {
    event.preventDefault()
    
    let url = document.getElementById('url').value
    const result = document.getElementById("results")

    fetch('http://localhost:8080/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
    })
        .then((res) => res.json())
        .then((data) => Object.entries(data).map(([key, value]) => {return result.innerHTML += `${key} : ${value}<br>`}) )
        .catch(error => result.textContent = error)
}
export { handleSubmit }
