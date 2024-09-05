async function getUserLanguages(headers, userId, result){
    return fetch(`https://www.duolingo.com/2017-06-30/users/${userId}?fields=fromLanguage,learningLanguage`, {
        headers: headers,
        body: null,
        method: "GET",
    }).then((res) => {
        if (!res.ok) {
            result.textContent = 'There was an error getting your languages. Verify your credentials.' + res.text();
        }
        return res.json()
    })
}

function kvak() {
    const token = document.getElementById('token').value;
    const userId = document.getElementById('userid').value;
    const result = document.getElementById('result');

    (async () => {
        const headers = {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.7",
            "authorization": `Bearer ${token}`,
            "content-type": "application/json",
            "Referer": "https://www.duolingo.com/practice",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }

        if (!token || !userId) result.textContent = 'User ID and token are required.';

        const { learningLanguage, fromLanguage } = await getUserLanguages(headers, userId, result);

        const parsedLearningLanguage = (learningLanguage === fromLanguage)
            ? (learningLanguage === 'fr' ? 'en' : 'fr')
            : learningLanguage;

        try {
            const res = await fetch("https://schools.duolingo.com/api/2/classrooms", {
                headers,
                method: "POST",
                body: JSON.stringify({
                    classrooms: [{
                        from_language: fromLanguage,
                        learning_language: parsedLearningLanguage,
                        name: "Unlimited Hearts Hack (Deletion will remove your unlimited hearts)"
                    }]
                })
            });

            if (!res.ok) {
                const { error } = await res.json();
                result.textContent = error === 'Classroom already exists'
                    ? 'You have already done this hack. This hack is permanent. No need to run again.'
                    : `Error: ${error}`;
            } else {
                result.textContent = "Success! To use your unlimited hearts, go to the Duolingo home page, click on your hearts, and under 'Unlimited Hearts' click Turn on or Enable.";
            }
        } catch (error) {
            result.textContent = error.message;
        }
    })();
}
