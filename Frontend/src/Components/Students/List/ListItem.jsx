import Button from "../../UI/Button/Button";

const ListItem = ({name, score, id, dob, onDelete, onUpdate}) => {
    return (
        <>
            <th scope="row">{id}</th>
            <td>{dob}</td>
            <td>{name}</td>
            <td>{score}</td>
            <td className="px-0 new-student__actions">
                <Button text='Update' type='button' onClick = {onUpdate}/>
                <Button text='Delete' type='button' onClick = {onDelete}/>
            </td>
        </>
    )
}

export default ListItem;