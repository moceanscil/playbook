import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { InputAdornment, SxProps, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'

import Edit from '../Edit'
import EditButton from './EditButton'
import EditContext from './EditContext'
import Resource from '@/types/Resource'
import Step from '../Step'
import useAirtableResources from './useAirtableResources'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
})

const COLUMNS: GridColDef[] = [
  {
    field: 'actions',
    type: 'actions',
    getActions: params => [
      <EditButton key="edit" resourceId={params.id as string} />,
    ],
  },
  {
    field: 'Last Modified',
    minWidth: 150,
    valueFormatter({ value }) {
      try {
        return dateFormatter.format(new Date(value))
      } catch {
        return ''
      }
    },
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

const originalSortModel: GridSortModel = [
  { field: 'Last Modified ', sort: 'desc' },
]

export default function Update() {
  const [nameSearch, setNameSearch] = useState('')
  const [resourceIdToEdit, setResourceIdToEdit] = useState<string | undefined>()
  const { isLoading, resources } = useAirtableResources()
  const [sortModel, setSortModel] = useState<GridSortModel>(originalSortModel)

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    /**
     * By default, MUI's DataGrid component cycles between three sort orders for
     * a given column: ascending, descending, and unsorted (`null`). We don't
     * want the unsorted state, so we'll disable it by forcing the sort order to
     * cycle between ascending and descending.
     */
    if (newSortModel.length === 0) {
      setSortModel(current => [
        { ...current[0], sort: current[0].sort === 'asc' ? 'desc' : 'asc' },
      ])
    } else {
      setSortModel(newSortModel)
    }
  }

  const resourceToEdit: Resource | undefined = resourceIdToEdit
    ? resources.find(resource => resource.id === resourceIdToEdit)
    : undefined

  let filteredResources = resources
  if (nameSearch) {
    filteredResources = resources.filter(resource =>
      resource['Name of Resource']
        .toLocaleLowerCase()
        .includes(nameSearch.toLocaleLowerCase())
    )
  }

  return (
    <EditContext.Provider
      value={{
        resourceIdToEdit,
        setResourceIdToEdit,
      }}
    >
      {resourceToEdit && (
        <Edit
          resource={resourceToEdit}
          onClose={() => setResourceIdToEdit(undefined)}
        />
      )}

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

        <DataGrid
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          columns={COLUMNS}
          rows={filteredResources}
          sx={styles.dataGrid}
          loading={isLoading}
          disableColumnMenu
        />
      </Step>
    </EditContext.Provider>
  )
}
