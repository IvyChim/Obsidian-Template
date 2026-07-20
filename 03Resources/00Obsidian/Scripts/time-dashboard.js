/******************************************************************
 * Time Dashboard
 ******************************************************************/

const today = dv.date("today");

const year = today.year;
const month = today.month;


// ======================
// Year Progress
// ======================

const yearStart =
    dv.date(`${year}-01-01`);

const yearEnd =
    dv.date(`${year}-12-31`);


const yearTotal =
    yearEnd.diff(yearStart, "days").days + 1;


const yearPassed =
    today.diff(yearStart, "days").days + 1;


const yearLeft =
    yearTotal - yearPassed;


const yearPercent =
    Math.round(
        yearPassed / yearTotal * 100
    );



// ======================
// Month Progress
// ======================

const monthStart =
    dv.date(
        `${year}-${String(month).padStart(2,"0")}-01`
    );


const lastDay =
    new Date(year, month, 0).getDate();


const monthEnd =
    dv.date(
        `${year}-${String(month).padStart(2,"0")}-${lastDay}`
    );


const monthTotal =
    monthEnd.diff(monthStart, "days").days + 1;


const monthPassed =
    today.diff(monthStart, "days").days + 1;


const monthLeft =
    monthTotal - monthPassed;


const monthPercent =
    Math.round(
        monthPassed / monthTotal * 100
    );



// ======================
// Progress Bar
// ======================

function bar(percent){

    const length = 16;

    const filled =
        Math.round(
            percent / 100 * length
        );


    return (
        "█".repeat(filled)
        +
        "░".repeat(length - filled)
    );

}



// ======================
// Important Dates
// ======================

const eventPage =
    dv.page("00PeriodicNotes/ImportantDates");


let events = [];


if(eventPage){


    const rootEvents =
        eventPage.file.lists
        .filter(
            item => item.list === 0
        );


    events =
        rootEvents.map(item => {


            let event = {

                name:item.text,

                icon:"📅",

                date:null,

                type:""

            };


            if(item.children){


                const children =
                    item.children.array ?? item.children;


                for(const child of children){


                    const text =
                        child.text.trim();



                    if(text.startsWith("icon::")){

                        event.icon =
                            text
                            .replace("icon::","")
                            .trim();

                    }



                    if(text.startsWith("date::")){

                        event.date =
                            dv.date(
                                text
                                .replace("date::","")
                                .trim()
                            );

                    }



                    if(text.startsWith("type::")){

                        event.type =
                            text
                            .replace("type::","")
                            .trim();

                    }


                }

            }


            return event;


        });



    events =
        events
        .filter(
            e => e.date
        )
        .map(e => {


            const left =
                Math.ceil(
                    e.date.diff(today, "days").days
                );


            return {

                ...e,

                left

            };


        })
        .filter(
            e => e.left >= 0
        )
        .sort(
            (a,b)=>a.left-b.left
        );

}



// ======================
// Render Dashboard
// ======================

const wrapper =
    dv.container;


wrapper.classList.add(
    "time-dashboard"
);



wrapper.innerHTML = `


<div class="dashboard-card time-card">


<h1>📊 Dashboard</h1>


<div class="time-item">


<b>${year} 年度进度</b>


<br>


<span>
${bar(yearPercent)}
${yearPercent}%
</span>


<br>


剩余 <span class="day-number">${yearLeft}</span> 天


</div>



<br>



<div class="time-item">


<b>${month} 月进度</b>


<br>


<span>
${bar(monthPercent)}
${monthPercent}%
</span>


<br>


剩余 <span class="day-number">${monthLeft}</span>  天


</div>


</div>

`;




// ======================
// Important Days Card
// ======================


const eventsDiv =
    dv.el(
        "div",
        "",
        {
            cls:"dashboard-card event-card"
        }
    );



eventsDiv.innerHTML = `


<h1>📅 Important Days</h1>


${
events.length > 0

?

events.map(e => `


<div class="event-item">


<span>
${e.icon} ${e.name}
</span>


<b>
还有 <span class="event-number">${e.left}</span> 天
</b>


</div>


`).join("")


:

`

<div class="event-item">

🎉 暂无重要日期

</div>

`

}


`;