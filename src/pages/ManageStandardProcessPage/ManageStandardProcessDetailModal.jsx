import React, {useEffect, useState} from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Descriptions, Image, Modal, Tag} from 'antd';
import {capitalizeFirstLetter, formatDate, formatNumber} from '../../utils';
import {imageExporter} from '../../assets/images';

const API = 'https://api.agrifarm.site';
export const ManageStandardProcessDetailModal = ({
	selectedProcess,
	handleModalClose,
	isModalOpen,
}) => {
	const [processDetail, setProcessDetail] = useState(null);

	useEffect(() => {
		if (selectedProcess) {
			let sortStage = {
				...selectedProcess,
				process_standard_stage: [...selectedProcess.process_standard_stage].sort(
					(a, b) => a.stage_numberic_order - b.stage_numberic_order
				),
			};

			let sortStageContent = {
				...sortStage,
				process_standard_stage: [...sortStage.process_standard_stage].map(
					(stage, index) => {
						return {
							...stage,
							process_standard_stage_content: [
								...stage?.process_standard_stage_content,
							].sort((a, b) => a.content_numberic_order - b.content_numberic_order),
						};
					}
				),
			};

			setProcessDetail(sortStageContent);
		}
	}, [selectedProcess]);
	function unitMaterialMapping(unit) {
		const unitMapping = {
			package: 'Túi',
			bag: 'Bao',
			piece: 'Cái',
			bottle: 'Chai',
			square_meter: 'm2',
		};

		return unitMapping[unit] || '';
	}

	const detailItems = processDetail && [
		{
			key: 'processId',
			label: 'ID quy trình',
			children: <p>{processDetail.process_technical_standard_id}</p>,
		},
		{
			key: 'processName',
			label: 'Tên quy trình',
			children: <p>{capitalizeFirstLetter(processDetail.name)}</p>,
		},
		{
			key: 'plant',
			label: 'Giống cây',
			children: <p>{capitalizeFirstLetter(processDetail.plant_season?.plant?.name)}</p>,
		},
		{
			key: 'plantSeason',
			label: 'Mùa vụ',
			children: (
				<p>{`Mùa vụ ${processDetail?.plant_season?.plant?.name} Tháng ${processDetail?.plant_season?.month_start}`}</p>
			),
		},
		{
			key: 'expertResponsible',
			label: 'Người chịu trách nhiệm',
			children: <p>{processDetail?.expert?.full_name}</p>,
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{processDetail.status == 'accepted' && <Tag color="green">Có thể sử dụng</Tag>}
					{processDetail.status == 'in_active' && (
						<Tag color="default">Ngưng sử dụng</Tag>
					)}
					{processDetail.status == 'rejected' && <Tag color="red">Không đạt yêu cầu</Tag>}
					{processDetail.status == 'pending' && <Tag color="gold">Chờ phê duyệt</Tag>}
				</>
			),
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(processDetail?.created_at)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất',
			children: <p>{formatDate(processDetail?.updated_at)}</p>,
		},
		{
			key: 'plan_farming',
			label: 'Kế hoạch canh tác',
			children: (
				<>
					{processDetail.process_standard_stage &&
						processDetail.process_standard_stage.map((plan, stageIndex) => (
							<div key={`Plan stage ${stageIndex}`}>
								<div style={{paddingLeft: 10, fontWeight: 'bold'}}>
									<p className={styles.title} style={{width: '70%'}}>
										{` Giai đoạn ${plan.stage_numberic_order}: ${plan.stage_title} - Ngày ${plan.time_start == plan.time_end ? plan.dayFrom : `${plan.time_start} đến ngày ${plan.time_end}`}`}
									</p>
								</div>
								{plan.process_standard_stage_content &&
									plan.process_standard_stage_content.length > 0 &&
									plan.process_standard_stage_content.map((action, stepIndex) => (
										<div
											key={`Stage ${stageIndex}Step ${stepIndex}`}
											style={{paddingLeft: 20}}
											className={styles.bookingItem}
										>
											<p
												className={[styles.title]}
												style={{fontWeight: 'bold'}}
											>
												{`Ngày ${action.time_start == action.time_end ? action.time_start : `${action.time_start} - ngày ${action.time_end}`}: ${action.title}`}
											</p>
											<div
												dangerouslySetInnerHTML={{__html: action.content}}
												className={styles.content}
											/>
										</div>
									))}
								{plan.process_standard_stage_material &&
									plan.process_standard_stage_material.length > 0 && (
										<p
											className={styles.title}
											style={{paddingLeft: 20, fontWeight: 'bold'}}
										>
											Vật tư cần cho giai đoạn {plan.stage_numberic_order}
										</p>
									)}
								{plan.process_standard_stage_material &&
									plan.process_standard_stage_material.length > 0 &&
									plan.process_standard_stage_material.map(
										(material, materialIndex) => (
											<ul
												key={`Stage ${stageIndex} Material ${materialIndex}`}
												style={{paddingLeft: 40}}
												className={styles.bookingItem}
											>
												<li>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '20px',
														}}
													>
														<Image
															src={
																material.material.image_material
																	? `${API}${material.material.image_material}`
																	: imageExporter.placeHolderImg
															}
															alt="Material Image"
															style={{
																width: 50,
																height: 50,
																borderRadius: 5,
															}}
															fallback={imageExporter.placeHolderImg}
														/>
														<p>{`${capitalizeFirstLetter(material.material.name)} - ${material.quantity} ${unitMaterialMapping(material.material.unit)}`}</p>
													</div>
												</li>
											</ul>
										)
									)}
							</div>
						))}
				</>
			),
		},
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin quy trình</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={1200}
		>
			<div
				style={{
					height: 650,
					overflowY: 'auto',
				}}
			>
				{processDetail && (
					<Descriptions
						style={{marginTop: 20}}
						labelStyle={{width: '15rem', fontWeight: 'bold'}}
						column={1}
						bordered
						items={detailItems}
					/>
				)}
			</div>
		</Modal>
	);
};
