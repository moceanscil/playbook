import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

const MOCK_RESOURCES = [
  {
    id: '1',
    name: 'Test resource 1',
    description: 'This is a description',
    url: 'https://google.com',
  },
  {
    id: '2',
    name: 'Test resource 2',
    description: 'This is a description as well',
    url: 'https://google.com',
  },
]

export default function Resources() {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardHeader title="Here are some resources that should help" />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <List>
          {MOCK_RESOURCES.map(resource => (
            <ListItem key={resource.id}>
              <ListItemButton
                LinkComponent="a"
                href={resource.url}
                target="_blank"
                rel="noreferrer"
              >
                <ListItemText
                  primary={resource.name}
                  secondary={resource.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}