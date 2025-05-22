import { Button, Stack, TextField } from '@mui/material'


export default function Capacity({ capacity, setCapacity }: { capacity: number, setCapacity: React.Dispatch<React.SetStateAction<number>> }) {


    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.textContent === '+') {
            setCapacity(capacity + 1)
        } else {
            if (capacity === 1) return
            setCapacity(capacity - 1)
        }
    }




    return (
        <Stack direction="row" gap={1}>
            <Button color='error' aria-label='Remove' onClick={handleChange} variant='contained'>-</Button>
            <TextField type="text" value={`${capacity} Person`} aria-labelledby="date-range-label"
                label="Capacity" />
            <Button color='success' aria-label='Add' onClick={handleChange} variant='contained'>+</Button>
        </Stack>
    )
}
