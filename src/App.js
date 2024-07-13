import styles from './app.module.css';
import data from './data.json';
import {useState} from "react";
import { logDOM } from '@testing-library/react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activateIndex, setActivateIndex] = useState(0);


	const onBackButtonClick = () => {
		setActivateIndex(activateIndex - 1)
	}

	const onForwardButtonClick = () => {
		setActivateIndex(activateIndex + 1)
	}

	const onStartButtonClick = () => {
		setActivateIndex(0)
	}

	const getPosition = (a, b) =>  {
		if (a > b) return styles['steps-item']
		if (a === b) return styles['steps-item'] + " " + styles.done + " " + styles.active
		if (a < b) return styles['steps-item'] + " " + styles.done
	}

	let ifOnFirstPage = activateIndex === 0;
	let ifOnLastPage = activateIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activateIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({id, title}, index) => <li
							key={id}
							className={getPosition(index, activateIndex)}
						>
							<button className={styles['steps-item-button']} onClick={() => {setActivateIndex(index)}}>{index + 1}</button>
							{title}
						</li>)}

					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={onBackButtonClick} disabled={ifOnFirstPage}>
							Назад
						</button>
						<button className={styles.button} onClick={onForwardButtonClick} hidden={ifOnLastPage}>
							Далее
						</button>
						<button className={styles.button} onClick={onStartButtonClick} hidden={!ifOnLastPage}>
							Начать сначала
						</button>

					</div>
				</div>
			</div>
		</div>
	);
};
