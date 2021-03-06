function handleSubmit(event) {
    event.preventDefault()

    let url = document.getElementById('url').value
    const result = document.getElementById("results")

    if (Client.urlChecker(url)) {
        fetch('http://localhost:8081/link/', {
            method: "POST",
            credentials: 'same-origin',
            mode: 'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url }),
        })
            .then((res) => res.json())
            .then((data) => Object.entries(data).map(([key, value]) => { return result.innerHTML += `${key} : ${value}<br>` }))
            .catch(error => result.textContent = error)

    } else {
        alert('please insert valid URL')
    }
}

export { handleSubmit }
