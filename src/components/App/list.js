import React from 'react';
import DragList from 'react-drag-list';

export const List = ({ points, updatePoints, updateIndex }) => {
	const handleUpdate = (e, update) => {
		const changeIndex = {
			old: e.oldIndex,
			new: e.newIndex
		}
		
		for (var i = 0; i < points.length; i++) {
			points[i].index = i;
		}

		updateIndex(changeIndex);
	}

	const removePoint = (index) => {
		let removeIndex;
		points.forEach((point, i) => {
			if (point.index === index) {
				removeIndex = i;
			}
		})
		updateIndex({old: removeIndex, new: false});
	}

	return (
		<DragList
		    dataSource={points}
		    rowKey="name"
		    row={(record, index) => (
		    	<div key={index} className="list-group-item list-group-item-action pointer flex-column align-items-start mh-150 overflow-hidden">
			      <div className="d-flex w-100 justify-content-between">
			        <h5 className="mb-1 overflow-hidden">
			          {record.name}
			        </h5>
			        <small className="close" onClick={(e) => removePoint(record.index)}></small>
			      </div>
			    </div>
			)}
			handles={false}
			onUpdate={handleUpdate}
		 />
	)
}