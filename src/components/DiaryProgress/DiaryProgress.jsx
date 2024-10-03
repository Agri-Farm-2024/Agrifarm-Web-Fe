import React from 'react';
import styles from './DiaryProgress.module.css';
import {Image} from 'antd';

export const DiaryProgress = ({diaryProgress}) => {
	return (
		<>
			<div className={`${styles.progressItemContainer} ${styles.firstPoint}`}>
				<div className={styles.diaryTime}></div>
				<div className={styles.progress}>
					<div className={`${styles.progressPoint}  ${styles.doneBackGrColor}`}></div>
				</div>
				<div className={styles.diaryAction}></div>
			</div>
			{diaryProgress.map((progressItem, index) => (
				<div key={index} className={styles.progressItemContainer}>
					<div className={styles.diaryTime}>
						<p className={styles.stage}>{progressItem.stageTitle}</p>
						<p className={styles.dayTime}>{progressItem.dayFrom}</p>
						<p className={styles.dayTime}>{progressItem.dayTo}</p>
					</div>
					<div className={styles.progress}>
						<div
							className={`${styles.progressbar} ${progressItem.isDone && styles.doneBackGrColor}`}
						></div>
						<div
							className={`${styles.progressPoint} ${progressItem.isDone && styles.doneBackGrColor}`}
						></div>
					</div>
					<div className={styles.diaryAction}>
						<div className={styles.actionWrapper}>
							<p className={styles.actionTitle}>{progressItem.actionTitle}</p>
							<p className={styles.actionDescription}>
								{progressItem.actionDescription}
							</p>
							{progressItem.isDone && progressItem.imageReport.length > 0 && (
								<div className={styles.imageReport}>
									{progressItem.imageReport.map((image, index1) => (
										<Image
											className={styles.imageReportItem}
											key={`Action${index}Img${index1}`}
											src={image}
											width={100}
											height={80}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};
