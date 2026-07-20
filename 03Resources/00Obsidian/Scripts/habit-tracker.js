/******************************************************************
 * Habit Tracker
 * Author: Suixiang
 *
 ******************************************************************/

const habits = [
    { key: "reading", icon: "📚", name: "Reading" },
    { key: "sports", icon: "💪", name: "Sports" },
    { key: "coding", icon: "💻", name: "Coding" },
    { key: "meditation", icon: "🧘", name: "Meditation" },
    { key: "mood", icon: "🍀", name: "Mood" }
];


// ===== Input =====

const month = input.month;

const [year, monthNum] =
    month.split("-").map(Number);


// ===== Days =====

const daysInMonth =
    new Date(year, monthNum, 0).getDate();


const days = [];

for(let i = 1; i <= daysInMonth; i++){
    days.push(i);
}


// ===== Load notes =====

const folder =
    `00PeriodicNotes/${year}/${year}${String(monthNum).padStart(2,"0")}`;


const pages =
    dv.pages(`"${folder}"`)
    .where(p =>
        /^\d{8}$/.test(p.file.name)
    );


// ===== Map date =====

const dailyNotes = {};

for(const page of pages){

    const day =
        Number(page.file.name.slice(6,8));

    dailyNotes[day] = page;

}


// ===== Mood Emoji =====

const moodMap = {

    5: "😊",
    4: "😌",
    3: "🙂",
    2: "☹️",
    1: "😭"

};


// ===== Build table =====

const headers = [
    "Habit",
    "Completion",
    ...days.map(d => String(d))
];


const rows = [];


for(const habit of habits){

    const row = [];

    row.push(
        `${habit.icon} ${habit.name}`
    );


    let completed = 0;
    let recorded = 0;


    for(const day of days){

        const page =
            dailyNotes[day];


        // no daily note

        if(!page){

            row.push("");

            continue;

        }


        const value =
            page[habit.key];



        // ===== Mood =====

        if(habit.key === "mood"){

            const level =
                Number(value);


            if(moodMap[level]){

                row.push(
                    moodMap[level]
                );

                completed++;
                recorded++;

            }
            else{

                row.push("⚪");

            }


            continue;

        }



        // ===== Normal habits =====

        recorded++;


        if(
            String(value).toLowerCase()
            === "true"
        ){

            row.push("🟢");

            completed++;

        }
        else{

            row.push("⚪");

        }

    }


    const rate =
        recorded
        ? Math.round(completed / recorded * 100) + "%"
        : "-";


    // Completion 放第二列

    row.splice(1, 0, rate);


    rows.push(row);

}



// ===== Render =====

const wrapper = dv.container;

wrapper.classList.add("habit-tracker");


dv.table(
    headers,
    rows
);