async function fetchUserLanguages(token, userId) {
    const res = await fetch('http://localhost:5000/proxy1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, userId })
    });

    return await res.json();
}

async function kvak() {
    const token = document.getElementById('token').value;
    const userId = document.getElementById('userid').value;
    const result = document.getElementById('result');

    if (!token || !userId) {
        result.textContent = 'User ID and token are required.';
        return;
    }

    try {
        const { learningLanguage, fromLanguage } = await fetchUserLanguages(token, userId);

        const parsedLearningLanguage = (learningLanguage === fromLanguage)
            ? (learningLanguage === 'fr' ? 'en' : 'fr')
            : learningLanguage;

        const payload = {
            classrooms: [{
                from_language: fromLanguage,
                learning_language: parsedLearningLanguage,
                name: "Unlimited Hearts Hack (Deletion will remove your unlimited hearts)"
            }]
        };

        const res = await fetch('http://localhost:5000/proxy2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, payload })
        });

        const data = await res.json();
        if (res.ok) {
            result.textContent = "Success! To use your unlimited hearts, go to the Duolingo home page, click on your hearts, and under 'Unlimited Hearts' click Turn on or Enable.";
        } else {
            result.textContent = "No needed to do more. Already Implemented";
        }
    } catch (error) {
        result.textContent = error.message;
    }
}
