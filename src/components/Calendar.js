
import { useState, useEffect, useReducer } from "react"
import ThemeSwitcher from "./ThemeSwitcher"

const months = {
	0: "Jan",
	1: "Feb",
	2: "Mar",
	3: "Apr",
	4: "May",
	5: "Jun",
	6: "Jul",
	7: "Aug",
	8: "Sep",
	9: "Oct",
	10: "Nov",
	11: "Dec"
}

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

var initialState = {
	day: parseInt(new Date().toString().split(" ")[2]),
	month: new Date().getMonth(),
	year: new Date().getYear() + 1900 
}

const calendarReducer = (state, action) => {

	switch (action.type) {
		case "SEL_DAY":
			return {
				...state,
				day: action.day
			}
		case "SEL_MONTH":
			return {
				...state,
				month: action.val
			}	
		case "SEL_YEAR":
			return {
				...state,
				year: state.year + action.val
			}
		case "RESET":
			return initialState
		default:
			return state		
	}
}

export default function Calendar(props) {

	const [ date, dispatch ] = useReducer(calendarReducer, initialState)
	const [ days, setDays ] = useState([])

	useEffect(()=>{
		getDays()
	}, [date])

	function getDays() {
		let li = new Date(date.year, date.month, 1).getDay()
		let ls = parseInt(new 
			Date(date.year, date.month + 1, 0)
			.toString().split(" ")[2])
		setDays([...Array(li).fill(null), ...Array(ls).keys()])
	}

	function updtMonth(val) {
		let newMonth = date.month + val
		if (newMonth > 11) {
			newMonth = 0
			dispatch({type:"SEL_YEAR", val:1})
		}
		if (newMonth < 0) {
			newMonth = 11
			dispatch({type:"SEL_YEAR", val:-1})
		}
		dispatch({type:"SEL_MONTH", val: newMonth})
	}

	return (
		<div className="calendar">
			<div className="calendar-head">
				<div className="calendar-selector">
					<i 
						className="fa-solid fa-chevron-left" 
						onClick={e => updtMonth(-1)}></i>
					<span 
						className="calendar-month">
						{months[date.month]}
					</span>
					<i 
						className="fa-solid fa-chevron-right" 
						onClick={e => updtMonth(1)}></i>
				</div>
				<div className="calendar-selector">
					<i 
						className="fa-solid fa-chevron-left" 
						onClick={e => dispatch({type:"SEL_YEAR", val:-1})}></i>
					<span 
						className="calendar-year">
						{date.year}
					</span>
					<i 
						className="fa-solid fa-chevron-right" 
						onClick={e => dispatch({type:"SEL_YEAR", val:1})}></i>
				</div>
			</div>
			<div className="calendar-days">
				{weekDays.map(day => <span 
					key={day} 
					className="calendar-weekday">{day}
					</span>)}
				{days.map((day, id) => day !== null ? 
					<span 
						className={`calendar-day ${day + 1 === date.day ? 
							"selected" : ""}`} 
						key={id}
						onClick={e => dispatch({type:"SEL_DAY", day: day + 1})}>
						{day + 1}
					</span>
					:
					<span key={id}></span>
					)}
			</div>
			<div className="switcher">
				<ThemeSwitcher theme={true}/>
				<span 
					className="calendar-reset" 
					onClick={e => dispatch({type:"RESET"})}>
				Reset
				</span>
			</div>
		</div>
	)

}