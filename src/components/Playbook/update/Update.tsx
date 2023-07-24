import { DataGrid, GridColDef } from '@mui/x-data-grid'

import Step from '../Step'
import useAirtableResources from './useAirtableResources'
import { IconButton, InputAdornment, SxProps, TextField } from '@mui/material'
import { Check, Edit, Search } from '@mui/icons-material'
import { useState } from 'react'

const COLUMNS: GridColDef[] = [
  {
    field: 'actions',
    type: 'actions',
    getActions: params => [
      <IconButton key="edit" onClick={() => console.log(params)}>
        <Edit />
      </IconButton>,
    ],
  },
  {
    field: 'Name of Resource',
    minWidth: 300,
  },
  {
    field: 'Program Summary',
    sortable: false,
    minWidth: 300,
  },
  {
    field: 'Website Link',
    sortable: false,
    minWidth: 200,
  },
  {
    field: 'Phone',
    sortable: false,
    minWidth: 200,
  },
  {
    field: 'Email Address',
    sortable: false,
    minWidth: 200,
  },
  {
    field: 'Address',
    sortable: false,
    minWidth: 200,
  },
  {
    field: 'Eligibility',
    sortable: false,
    minWidth: 300,
  },
]

const styles: Record<string, SxProps> = {
  dataGrid: {
    width: '100%',
  },
  textField: {
    width: '100%',
  },
}

export default function Update() {
  const [nameSearch, setNameSearch] = useState('')
  const { isLoading, resources } = useAirtableResources()

  let filteredResources = resources
  if (nameSearch) {
    filteredResources = resources.filter(resource =>
      resource['Name of Resource']
        .toLocaleLowerCase()
        .includes(nameSearch.toLocaleLowerCase())
    )
  }

  return (
    <Step title="Update a resource" step="Update">
      <TextField
        label="Filter by name"
        sx={styles.textField}
        variant="standard"
        value={nameSearch}
        onChange={e => setNameSearch(e.target.value.trim())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {!isLoading && (
        <DataGrid
          sortModel={[{ field: 'Name of Resource', sort: 'asc' }]}
          columns={COLUMNS}
          rows={filteredResources}
          sx={styles.dataGrid}
          disableColumnMenu
        />
      )}
    </Step>
  )
}
