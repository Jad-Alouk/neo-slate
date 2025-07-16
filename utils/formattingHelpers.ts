// Formula: word count / 200 = estimated reading time
// On average, 200 words can be read in one minute
export const calcReadingDuration = (text: string) => {
    const words = text.split(" ")

    if (words.length < 200) {
        return "1 min"
    } else {
        const duration = Math.round(words.length / 200)
        return `${duration} min`
    }
}

// Used to convert string[] stored in db to a single string
export const convertArrayToString = (arr: string[]) => {
    if (arr.length === 0 || (arr.length === 1 && arr[0].length === 0)) {
        return "empty"
    }

    return arr.join(", ")
}

// Converts multiple input data to objects suitable for db
/*
    The function is responsible for three operations:

        1- Takes a bunch of social media links and puts them in one object.
        2- Loops over an array of team members names and maps each name to their role:
            Names array: ["First Name", "Second Name", "Third Name"]
            Roles array: ["CEO", "CTO", "Manager"]
            Result: [
                {
                    name: "First Name",
                    role: "CEO"
                },

                {
                    name: "Second Name",
                    role: "CTO"
                },

                {
                    name: "Third Name",
                    role: "Manager"
                }
            ]
        3- Loops over an array of reviewers and maps each reviewer to a review:
            reviewrs array: ["John", "Jack"]
            reviews array: ["Good...", "Super good..."]
            Result: [
                {
                    name: "John",
                    text: "Good..."
                },

                {
                    name: "Jack",
                    text: "Super..."
                }
            ]

    Finally, the function returns three objects: links, team, testimonials
*/
export const convertBusinessDataToObjects = (
    facebook: string,
    twitter: string,
    instagram: string,
    linkedin: string,

    membersNames: string[],
    membersRoles: string[],

    reviewersNames: string[],
    reviews: string[],
    ratings: string[]
) => {
    const links = {
        facebook,
        twitter,
        instagram,
        linkedin
    }

    let team = []
    let testimonials = []

    for (let i = 0; i < membersNames.length; i++) {
        team.push({
            name: membersNames[i],
            role: membersRoles[i]
        })
    }

    for (let j = 0; j < reviewersNames.length; j++) {
        testimonials.push({
            name: reviewersNames[j],
            text: reviews[j],
            rating: Number(ratings[j])
        })
    }

    return { links, team, testimonials }
}