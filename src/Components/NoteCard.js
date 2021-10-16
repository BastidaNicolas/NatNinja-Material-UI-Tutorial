import React from 'react'
import { 
    Card, 
    CardHeader, 
    CardContent, 
    IconButton, 
    Typography, 
    makeStyles, 
    Avatar
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { blue, green, pink, yellow } from '@material-ui/core/colors'


const useStyles = makeStyles({
        avatar:{
            backgroundColor: (note) => {
                if(note.category == 'work'){
                    return yellow[700]
                }else if(note.category == 'money'){
                    return green[500]
                }else if(note.category == 'todos'){
                    return pink[500]
                }else{
                    return blue[500]
                }
            }
        }
})

const NoteCard = ({note, handleDelete}) => {

    const classes = useStyles(note);

    return (
        <Card elevation={1}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)} >
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary'>
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NoteCard
