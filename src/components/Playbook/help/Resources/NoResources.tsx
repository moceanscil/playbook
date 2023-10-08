import { Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import { MAILTO_EMAIL_ADDRESS } from '@/constants'
import toStringWithMailFriendlySpaces from '@/helpers/toStringWithMailFriendlySpaces'

const useEmailBody = () => {
  const searchParams = useSearchParams()
  const county = searchParams.get('county') || ''
  const need = (searchParams.get('need') || '')
    .split(',')
    .map(value => `- ${value}`)
    .join('\n')

  return `This email is to let you know that no resources were returned in the NeighborAide Playbook for the following search criteria:

County: ${county}
Area(s) of Need:
${need}
`
}

export default function NoResources() {
  const emailBody = useEmailBody()

  const params = new URLSearchParams({
    subject: 'Resources missing from NeighborAide Playbook',
    body: emailBody,
  })

  const mailtoHref = `mailto:${MAILTO_EMAIL_ADDRESS}?${toStringWithMailFriendlySpaces(
    params
  )}`

  return (
    <>
      <Typography>
        It looks like we can&apos;t find any resources that meet your criteria
        or requirements.
      </Typography>
      <Typography>
        Please <Link href={mailtoHref}>click here</Link> to let us know about
        this resource gap. Thank you!
      </Typography>
    </>
  )
}
