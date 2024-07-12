export const sendPostback = (subid: string, status: string, type: string) => {
  const readyUrl = `https://paqriton.xyz/b57c2d5/postback?subid=${subid}&status=${status}&sub20=${type}&from=gnsPWA`;

  const res = fetch(readyUrl, {
    method: 'GET'
  })

  return res
}




