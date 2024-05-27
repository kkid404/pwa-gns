export const sendPostback = (subid: string) => {
  const readyUrl = `https://paqriton.xyz/b57c2d5/postback?subid=${subid}&status=lead&from=gnsPWA`;

  const res = fetch(readyUrl, {
    method: 'GET'
  })

  return res
}




