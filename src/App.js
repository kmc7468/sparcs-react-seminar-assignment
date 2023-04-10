import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const [data, setData] = useState([]);
	const [usableId, setUsableId] = useState(0);
	const [filterMode, setFilterMode] = useState(0); // 0:전체 1:높음 2:중간 3:낮음

	const addTodoFunc = () => {
		const impHigh = document.getElementById("AddHigh").checked;
		const impMiddle = document.getElementById("AddMiddle").checked;
		const impLow = document.getElementById("AddLow").checked;
		let importance = 0;
	
		if (impHigh) {
			importance = 1;
		} else if (impMiddle) {
			importance = 2;
		} else if (impLow) {
			importance = 3;
		} else {
			alert("중요도를 선택해 주세요.");
			return;
		}

		const title = document.getElementById("AddTitle").value;
		const content = document.getElementById("AddContent").value;
		const due = document.getElementById("AddDue").value;

		if (title === "") {
			alert("제목을 입력해 주세요.");
			return;
		} else if (due === "") {
			alert("기한을 입력해 주세요.");
			return;
		}

		setData(data => [...data, { importance, title, content, due, id: usableId }]);
		setUsableId(usableId + 1);
	};

	const removeTodoFunc = (id) => {
		return () => {
			setData(data.filter((todo) => todo.id !== id));
		};
	};

	return (
		<div className="App">
			<h1>TODO List</h1>
			<div className="AddComponent">
				<h2>할 일 추가하기</h2>

				<strong>중요도:</strong> 
				<input type="radio" id="AddHigh" name="importance" value="high" />
				<label for="AddHigh">높음</label>
				<input type="radio" id="AddMiddle" name="importance" value="middle"/>
				<label for="AddMiddle">중간</label>
				<input type="radio" id="AddLow" name="importance" value="low"/>
				<label for="AddLow">낮음</label>
				<br/>

				<strong>제목: </strong>
				<input type="text" id="AddTitle" />
				<br/>

				<strong>내용: </strong>
				<input type="text" id="AddContent" />
				<br/>

				<strong>기한: </strong>
				<input type="text" id="AddDue" />
				<br/>

				<button id="AddData" onClick={addTodoFunc}>추가</button>
			</div>
			<div className="DataComponent">
				<h2>할 일 목록</h2>
				<div className="DataFilter">
					<strong>필터링:</strong>
					<input type="radio" id="FilterAll" name="importanceFilter" value="all" defaultChecked="true" onClick={() => { setFilterMode(0); }} />
					<label for="FilterAll">전체</label>
					<input type="radio" id="FilterHigh" name="importanceFilter" value="high" onClick={() => { setFilterMode(1); }} />
					<label for="FilterHigh">높음</label>
					<input type="radio" id="FilterMiddle" name="importanceFilter" value="middle" onClick={() => { setFilterMode(2); }} />
					<label for="FilterMiddle">중간</label>
					<input type="radio" id="FilterLow" name="importanceFilter" value="low" onClick={() => { setFilterMode(3); }} />
					<label for="FilterLow">낮음</label>
				</div>
				<div className="DataList">
					{data.length === 0 ? <p className="EmptyDataList">할 일이 없습니다.</p> : data.map((todo) => {
						let draw = false;
						if (filterMode === 0) {
							draw = true;
						} else {
							draw = (todo.importance === filterMode);
						}

						if (draw) {
							return (
								<div className="Data">
									<h3>{todo.title}</h3>
									{todo.content === "" ? <></> : <p><strong>내용: </strong>{todo.content}</p>}
									<p><strong>기한: </strong>{todo.due}</p>
									<p><strong>중요도: </strong>{todo.importance === 1 ? "높음" : (todo.importance === 2 ? "중간" : "낮음")}</p>
									<p onClick={removeTodoFunc(todo.id)} className="RemoveData">할 일 완료</p>
								</div>
							);
						} else return (<></>);
					})}
				</div>
			</div>
		</div>
	);
};

export default App;