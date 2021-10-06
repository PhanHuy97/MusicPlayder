const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYDER_STORAGE_KEY = "phan-huy";

const play = $(".player");
const playList = $(".playlist");
const cd = $(".cd");
const header = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYDER_STORAGE_KEY)) || {},
  songs: [
    {
      id: 1,
      name: "Next Level",
      singer: "aespa",
      img: "https://avatar-ex-swe.nixcdn.com/song/2021/05/18/b/0/3/a/1621303973926_640.jpg",
      music: "./assets/music/aespa 에스파 'Next Level' MV.mp3",
    },
    {
      id: 2,
      name: "How You Like That",
      singer: "Black Pink",
      img: "https://i.ytimg.com/vi/8mA6jIeojnk/maxresdefault.jpg",
      music: "./assets/music/BLACKPINK - 'How You Like That' M-V.mp3",
    },
    {
      id: 3,
      name: "Lovesick Girls",
      singer: "Black Pink",
      img: "https://i.ytimg.com/vi/dyRsYk0LyA8/maxresdefault.jpg",
      music: "./assets/music/BLACKPINK - 'Lovesick Girls' M-V.mp3",
    },
    {
      id: 4,
      name: "AS IF IT'S YOUR LAST",
      singer: "Black Pink",
      img: "https://i.vietgiaitri.com/2020/5/5/nho-as-if-its-your-last-blackpink-vua-xac-lap-ki-luc-moi-tren-nen-tang-am-nhac-quoc-te-308-4908047.jpg",
      music:
        "./assets/music/BLACKPINK - '마지막처럼 (AS IF IT'S YOUR LAST)' M-V.mp3",
    },
    {
      id: 5,
      name: "DDU-DU DDU-DU",
      singer: "Black Pink",
      img: "https://i.ytimg.com/vi/IHNzOHi8sJs/maxresdefault.jpg",
      music: "./assets/music/BLACKPINK - ‘뚜두뚜두 (DDU-DU DDU-DU)’ M-V.mp3",
    },
    {
      id: 6,
      name: "Permission to Dance",
      singer: "BTS",
      img: "https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=bedbc0e9-2d3d-43c3-aa42-d3ed343f6011&resolution=1440x756&type=image",
      music:
        "./assets/music/BTS (방탄소년단) 'Permission to Dance' Official MV.mp3",
    },
    {
      id: 7,
      name: "On The Ground",
      singer: "Rosé",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFRYZGBgaGBgZGBgYGhoZGhgaHBkaGhoZGBgcIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHDErISs0NDExNDQxNTQ4NDQ/NDQ3NTY0PTc9MTExNDE3NDQxMT82MTExNDQ2NDQ0NDE1NzExNP/AABEIALIBGwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBQYCB//EAEIQAAIBAgQDBQcCBAQEBgMAAAECAAMRBBIhMQVBUSJhcYGRBhMyobHB8ELRUmJy4RQjgrIHFZLxJGN0osLSFjM1/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAkEQEBAAICAgICAwEBAAAAAAAAAQIRITEDEkFRE4FhkbHwof/aAAwDAQACEQMRAD8A8rhEizaCdTkSVg6BY+EC04Hw+5DN6TfcOS+/wj/3Hp4TPcHo7D8tNThzpbkN/wA6/vDUWuHue4fX+0s8PbQSmw1S9hsOXhLMPaZVYtT00+e3pK/GYUZTcBv6th5SRRxF41xOsAtr/ngJmrGPfV26DpoJM4PgwxtyNyQfqAfp3+vK0TZu8y94NQAQMd76Hof7zLdONw5HRqNQBkdSpDa3HQ945GeJ+0nBmwtd6JuV3Qnmh28xsfDvnv7uukwH/FLAK9NK6jtIdf6W0N/MD0m8XOvK7RGE7tOslxNsGDCBhAIQnMAhCEAhCEAhEiwCESEBYRIsAhEiwCEIkBYRIsAhEnQEBVE0GCohBY9NT85WcNoZnudh9eX53TQYbDNUbKB4nko3t6fWCLLglM9qodh9TLpnsqqPiO/if21MZFJUVKa7WznvubAnxt6Rl8Tdx5Aee329TI1GgwT216D5co4uJzHKPE90rnr2TTdjp4DQSfwbAMU7W7asfoPCRZEqnVJIA/7/ANpZUsEXHa0Ek4TCKmtteslhplVTiuFhUuNbG9pBfiSoNPzreaOo2lpgPaDDtTqfyHUfeStTlbHG3594kPilq9J6R/UCnhmFh85X08RYWPS05weIPvAp52PodfrEpY8wZCCVOhBIPiN49TXQyd7UYX3eJqKNixPrIiaIx7tPPQTq5IDicmdPOTCCczqcwCEIQCESEBYkIQCEIQCEIQCEIQFhEhAWESEBQI4oiINZMwtO7Be/XuEC24PgWIA2za3P09JoeFUxUqCjT+BdXbm1tS1+Q0Nu8gyupPZCw5AhR38vnaaL2SpBMNia1vgpkg872JNvRZGkKviszu/IsT4ILqtv9Kk275X4asWe/T5E6AeV/lH8YoRLf6fIW/a3nImAUhWYC57TegsPmWklXTSYAF3At2VFvIazVcI4tRqLZCAR+k6H0Mwvs0uIVHe5YkaKLmxNrAjy+cm0UZmLOgp1UIDqhuoJANweYN/rJWp9PRVq3jikSjwTvkzHXSRK3H3Q2CFvDeQ00ziUPtDQDISRquvlz/O6dYb2iU6Mjr4gid4+uro2U/pNx5SVZLGHdiDbxt5fvG8DVviVUfpTX12+UiVccCgfmp+mh8efqIns2MztUvdmNu7pbvjS2mfbDCZ6hYfFr+fOZ3EjKgXmdfAbD7n0mg9qnK1W7jYj11+fymartcXPOdI5VEZY2Y4xjcrIhCcwCEIkAhCEAhCEAhCJAWEIQCEIQCEIQCEIQHFlpwxNS3cft+4lYBLfhy3B/wBIv84ItqI0C9ftbX5Tb+y6BsHWXmd/lp6D5zFro6r/ACv9JpfYnF2qPROzpcdzKSbeYPymW1Zx6hay9Mx/f7S09k8ECO1/CLeZuf8AdO/aLC9vwRj6Wk7gKZFX+lf9q/nlM1uLyjwlRewtfe2l47Wwahcu5Nhrrp0+ZkxKwC37pGwz5315G8InPhgECgcp5p7T4asWPunyOGBCm6hltrdhre9uYnqVZ7G0g4vAo+pAMEeTl8fhymSsa5Iu6GzBf6SdbWtzmsw+Kqe4apVTIcp0v3TTUsCibKPSU/tM4FNugFyNvAetpm8tR5Pjsq9hSSx3F9AJr/YzBnsseZ+4H2mYw2EL1Dp8R+p/eeo4DBCmEW2wUepBP3m9Mbed+2B/8TUHQgjyAv8A7vlM7ilBAK9NppPaxlOJqX0s5U94NrH7TM4ykyNbl+kjYjummKhlZwY6XnB1lRzCdFDvGzAIkCYl4BC8S8LwFvC85vJOHwbulSotslJVZySBbMwRQOrEnbuMBi8IAwgEIQgEIQgEIQgEIQgPLNDw2lYKOt28r5QPlM9NhwpLhbD9Cf8A2+8EdVEPvR3KfmCJY+zVNveFwdQygeQvItXR2bvUfK/3l77JYcNY9Wc2/wBGn53TLa6x9A1bVOWRldeetu0B5GGATKig8rrKnH8Rali6KKbBke45N2lP0+vjL1lDozJodyvQje3dJVlLjcZYBBt1nOCxbI2be/QTG8Rx2JR2sgdb/p3A7wd5Y8E9r0UWrKFYHc6GRv1rcUsYagJykWO5EkLUkHBcVpVVujA3G3MeM7d4TRcVXtKbj+BLUXD3FgGtuQRYi4UEWvtci4udcs5xePHvkpixJIZr3IygjQ26/QGQGwgppUAc/wCZVq4g3B1b/wDSVzrcAk9oKbAgEAWFwxS34Q/ZzhYaspI7K6ny/B6TRviM2IyclTMfEtp8vrE4JQyUzUO7bd3ISs4ZXD16rg6AWv4HQekqMT7bLbFVAdic3/UB9Jnv8RuraoTqOYPUdD9ZoPbmoGxBb+VQfK5/+S+kypY3moxRiKdj1HI9Y0I9lJGx7jbSMGVGw4BwynVSzjXkdiDKj2g4K1BrjVDz6eM74DxVqZy2uJqcbiUr0yp3I2O8oxfs5w5MTiEw7s6ZyQrJlNmALdoNysDtJOK4HSNHEVqFRycM6pVp1VUEhnNNXRlNjqD2SL6eF5PsbhWHEKNlJCMxYgEhVyst2PIXIFz1EsuJq+JoVsNTT3VejWZ6lBVWn/iaZbs1coALOvZ01B0IuSLZoz3/ACulSo06+JZ71gzU6VLKGyAgZ3d7hQTsADca3Ef/APxrO+GNBy1LFMUV3WzU2U2dKig2zCxIse1bS0k8Ywz4qhhXoIzvQojDV6SgmpTZCQrGmO1lbXUDlY6jSQMP/lYThhqZK/vqldyrC9BsrGmrMDZW0zHW6yKqcbw7DKuICNXWpQy9iqqj3n+alMsCPhsGvlIJ1BubGT+IcPw1CjQQviGTEqlYIi0i1wMqBibFiM7WA0uxlhj6lWvha3/McPkrUlUUMQUyPUctYU1sLVb6/DdbG+mjSTxIYynT4eaOHNQpRQurUUcq6FDlZmQtTPgQRvygYTH0kSo6I5dAxCORYsvLMOTciOoMZEkcVwrUqz02tnBBYA3CswDslxuVLZSeqmRgZULCEJQQhCAQhCAQhCBpaHAHQipWACgXtfc8gZecKXsgn86fIxONcR97Uaig7KlQW6ncyYtO1MW8vHQD7RViHjF2PVr+X/aaP2QIAB6Zj9R95ncVTPZA5/uJe+zS5R5fn0mK2rfayrlxVJhqAALeJGvjaaKrVKqKi72BPeOf7zJ8UxIq4lqbWspCg9P73mz4dTzU8o1y7A/T86wIzgVGzrZHHX4H6aj4T3/LnO6TOCUfD69bIQe8EHad6UzoLjpz8uskrxhLfK1vl4zNdJlZOHdPDInbVFQkdrKAL+NotKt71iqnQfEfsO+N8TQvTzZzTvoCfv0jns/g/c0gpsSbkkag94+saZuSnxLBcYgAvZTceTEC/f1jmJqs4FME3f3Y3YXCLo5Q6cwddRlHic9TxpfH5hqBnA1tbMpF+/fbnr1mqpYRaQXTtW36dw5Dy3sJqMWn+JV8lJlX9KWHcT2V+rHylXwrC5ELNoXtodDbYX8SZOeoMpLmwvyuSbbee+girVDAWFgbHv8AODbzf2zwbU3zFs2fO9+lytxboNJD9meFNXqpcdgXJP8ATbT5zb+0HCkxRsDZqZsrjuJzg9b3I8pI4Dw1MMruSAo7IJ/gXW/mSTNsuquCpKMuRbWtsPrMlxn2UJcvRFlys7X+FbdD38h4z0BnRmDgXFtP3sZD4pjAqNsxKns2vfQ7iB5twvhLtdgLgEAm4Fi18up62PpJWIBsVOjDKe8Xs2vTQiS0xnukemguS1NrlUdRkLFgQ3XMALDlFr8VWkigA3e2cMo1VcPTpfpcNq6ZtGUjMTcEQjJYsNUcKFzMb2HUC9zroAAGudhY32kSvhWT4ly621I3yq3I7ZXU32N5qlf39ZKyPUp+7RlX4XZTdylr2DCzKGBABGYbGSMY6U1ZlUqxDkZEVQrPSpJmUZuzZ6bOFGi5gBtIMVQoF2CIuZjeyi19ASfkCY3pbumxfi1BVWopABeo/u1VcwDNiMq/GMhUVVzXWxyJYnKL1OM4nSerTfKQlO5yZafZOjLTBFi9MONyR2WNgDctBX0+GVSzUxTbOpVWWwDKWYIoIPVmUeYkMZe6aah7QUxUSsyNnyUEcL8LGjiKdRWDMxa/u6apruRfnBuP0ymVlcsKboKmVMzlqapncX0ZSq21NwBrcahnEYcpMwuCqVAWRS4BCnLYnMVZgoXckhWIABvlPQy04vxunWR0CsMxuoKrZT7+q4Nwbi1N1Tb9NtpzwfjdOirA07ZqlNuxugRKq+8R6jMVqg1Qym1rp3mUUwMWDuugVQtha4zXfozBmYA9y2E5vA6hEvC8oWES8LwFhEvFgbbhmH3Y6k6375f1NlXrc+n9ysi4LDWVR1Py2kmue2f5QAPqfqPSStRDx5sy9xA9N5d8FNkzd0pcWLsi76En89JZ06mTDue42mK3GZwY97iDVGzXYjv5/nfN9wnssByImK9jsKWa+umnUXno+Gwegta410OvzlZV+Pw2YkDf8/vLDhvB0UZm1O57ues6yZhm5gjSXKZQt737hqeuwiFrM8eRzemh06nUjTW0ZwOLKDIw0tYiXeLW50BtvM7xPCuT2B9vnLTFn+HYEJjib3vcoeqk6E9/Lymrx5JewldgaBVldh2gbHuW4Nvr6ywxLf5hUfwHXv0sPqZx82dw8dyncjUm7IoKmOpvUCXfQ2zDLYnuBF7d95YGoUYI2xsAR36A2kKlw5KY943Tny/vJmJXMaQGlgCeoGlpxzuWFxktu5/1Wast11o1Rwho3FyRvmO55m/fOsUwdVHasRtpa1yDf0khXUlqZ2ubHobmNYgZcoI1sdv6jHi8uVymOd5/2GWM1bOv8KjA3ubC3Lc67SNi6KBM93IY5dMtxvrr4RxWS2ou3j9p1i6eakB/Pf8A3Tfn9sbNW82T9Jhqy8fCrpcIou5UM2ihx8PQaEdQTKOnwJK1cq7uA5AQjLdbAntXGvlbzmk4Olnff4G38VjXDaie9QBCNdDnJtoeVtZyyzzx/JN26k1fpqY43V+6peB4ai2IfCqagsWAZsmrISG0A2NhaOY6nhr+7d6iAnKXPu8q62ub7C/OTeGYMf473g3DVfO4beVvGOIUl96hpWZ6dVVfMzWY3A7J012vylmedz1Lepf7+U1PXfHdYLIdOtpcYLhCCh/i8Q7JTZstNUAL1WF72LaKose0eh7rw6tIoSrAhrkEEWII3BB2l97VJmweAdNUFNkJGwey3B7yVb/pM9Hkyu8cet/P6YxnFv0r8PgsJVWoUesjpTd1R8jB8qk6OoFrbkW2vY9H+HcHwz4R8Y7Vh7tlV1XIczEqLrcbXYb9I57IYChWWv72lnNOmaisGdSdD2SFa1tN7X1O8l8Fen/y3Fl0Y0zWQlUbKQC1KwVmDbXG97235zz+TyWWyW8WT+/p0xxl5snVVHE+CIuHTGUKjPSZsjKyhXptrYNYkEab9466cYThKCgMXiGZabMVpogBeqRfMQW0VRY6m+2217b2uJShQp4cAYNhnRhmLM+pYVGJ+IXJA059NG/agZsHgKiaoKbKSOTgKGBPUlW/6TLh5crMZvu2b+ZOeL/PGkskt46iFT4TSr0nqYVnz01zvRq5SzLzamy2zW5gjmO672B4Rh3wb4tmrA02VWVclizZRcEjRbtz6SR/w50xTudEWg5c8gt139PlE4X/APycUP8AzqX+6jGeeUy9ZeJcf/bySSzeviqngGDpVqgpVWdSwYqyZbDKjOcwYc8ulpZcF4FRxiVRReotVACq1MhVgSbDMACDpbxIMr/Zcf8AiUPRapJ6AUXJJ7p3wSuyUMTUQlWUYcqw3BFXeb8vtz63V41+6mOtTc+zPCMEj4hcPWzoWcU+zlurlsvaDcgb7Sz4BwfC4pqihq6impcE+7JKCwsRbQ3v3S84eiY56GNQBcRSq0v8Qg0DqGA94oPQfIEbgXqf+Hfx4n/0zfUTl5PNbhlZdWa3PqtY4yWTuXaHgOF4XEN7uhWdKh+Fa6rlc2Jyh0PZPiPWUuKRqTtScFWUlWFtiJI4FTZsRQVQS3vKZFt9GBJ8gCb90s/bashxtawB1QE6bimoI8iCPKd/fLDyevc1tn1lx23xChwNgo18Bb88pDQlj/UST4XjuJcBHf8AjOVf6RufrGcMxyZub6L3Dr952tSR1g6fvKx8CB5A/wB/ST/d5qKjkTr8/wB5D4K49+oGwJS/UldfHcehltwyndMp3UkekipfsjwwIrKRroR4dPp6zVU0AFzuNjsdZAwWUAMBYDv1v3/KSzixcgjz8JpmotEaVNOd/Q3kvB4kWyWuR9BpeVpds7BdBpv4fPwj9OnlGmnO/wBvGRVkyc7faV2IQkkfn5+8fbEEi3UdDHygt2trXMrKmGFuSRtynL4UXuRfaW9VgBtbu6d0ijtHLa23pudDGtzVNqWugJ2vba8Y92Qcx1Y66y2KAPc2sfwRvE4fW85zxYzqfx+l9qp2XW9oj3NidSBby75YvhyBt4xcHQ7VyLzUwxmuOujdQVwLEZjoO/8ANJJWn2bWFuW/3lg1UMcoFgN4xXN/Ab8oywmWvb45hLZ0o61UoxKKpNrEtm2PLQ25SvwlQI+YKL8gcxC6WNtfreXr0M2oG/lK98Fle9vG3TpH4cbvc7757T2s1/DhHyP7wIobU/q3N76X53lRinUVBUFCkXXUM3vGsb3uAXtvrtNNiMOLeA1lNxGmAGqHl+aR+DDvXxrv4PfJ55xlCHJJuSSSeZJ1JPrDh3GalJGolUqUnN2pVAWS/wDEpBBVu8GdcSxBdj+fOVxE1lhLNa4SZWdLelx73aVEw9BKPvFyO2Z6jFddFzNZdzynOE48aeHbCihSZHIL5jVuzLlsxIcWOg2sNJU2hac/xYfX8/0vtVlgeONTovhmp06tJ2zZKgfsN1RlYFfzqb84LjDIrUWRHou2Y0mzZVPVHBzK3K9z33lfaFpfxYc8d8/s9qsq3GD7tqNGmlBHtnCF2d7bB3Ykld+yLDUznhHF3w+dVVXSoMtSm4JRhy2IIOp1HWV9otpfx46s132e13tY1OKqFZKNBKOdcrMC7uV5qCx7KnnYXPWc4Pigp0no+5puHtnZjUzNlYsvwsALE8gL87yvtC0fjx1o3UnhXEKmGqLWpmzL1+Fgd1Ycwf2O4kvgfHGwobJSpszqVZmzklT+mwcADyvKu0LRl48ct7nfZMrOltR4+9MH3FKlQZhYuiuzgcwr1HbKPCVWUHUi5O5J1MLQlmEiXKvSsY+eyD4VFj9/pIfEcaUFh8RFkHQdY5hnvouu2nWVnFATV62Fr+P58pHRc8Bp5DQc6gkMT3sdf9013uSlRiBdSbnwOtxMtwSoGRUO6kAedh+02NCsHAvowHPpyMQqxRRlDLsekZrYhBa/LmRGXqsA1ixPfe+njITGoTYgGVmRcNjqIFy3avfYyHU4zT5ZtNQArHxOgkKpTK6lANP1MLb+E7oj3im1gnMroTbvP7COV4P0eNJewV+7sMDr4y3fFXsbEXPwlWFhyuSNdLbSv4fhUVuwL289e8y6pNffQyxLpXVnN9/S8ewqknTpbXyG/rJj0L9/jGzZBv59PAc5WULiuHAVSORt631nCrcC8THYpVodrtEmy35kG97dw+0hYTGDQczv3dPvAlogvb1HXW8axCZDcbH5Tpm1nDVb6HeBGSk5Jy8/p4yQMPcZTz8to/QeyjxnOJqA31t1v4wqP7tRtoTp4+Ej1qY/PrFp1ASfTXc984xNXQ3/ADwljNQ8ZUGSx0Ytqf5egH5vIPEHRlyshYD+a30nOJqEtc+XcI2UzDXpNDHcVemjFUpBf5rlj85n6q63mj9oaVn8pQVBM0RoRTEgEIQgEIQgEIQgEIQgEIQgel8CwZVcx+JrkHoI3xPhxJDDmbD89JeYC1rdR8tpLq4br00nPTpvTL8NUqcw3G45GaOpjs4FRPiW117uYkU4QA5didQdtfGM1cFrqCD/ABLGjcbHAVUenmAGoFj+eMYruq69Nvrv4zLUMRUo/wCWrnIx0Ouh6GLUVn+N2PQbDXzv85dppbV6JrAurBwD8INip53kzBYMsozXA/hGgH7+ci8Hpil8I1J177S5xGIA7UuktP4OmEXSTkPQXmdw2Pd2NgAAdxpLF85Nix77yon1a1t/2+R1+UjvVLDz8Y0EFo2XHWQR+IUSSF1It1687RipgAq5mIUaWYnUHqBf0vp3R2s/fIGKGYb6jYmzW8A1wJQ+lcMAQbgjeR6tQhpEFbKDqTYk66+M7SuHBtqRvCrKjiOXIxrGNqOYGpHXlIlJ7a6xx3uNfnCHC3ZJ/V07pTVMWWOXa0dxdYqNJX4d7m/j8/wTUQ6wjhGl+6KFjLKftKM5xohmy2v05TNYlAJp+NkKf5iLDuHMmZWvcm9tJKIpiRTEkBCEIBCEIBCEIBCEIBFiRYHsfC1swY7HT9pcOb78yPrKUVeyOUm0sVpfQySNWpGJoqxN9F/PSVWKQhtOWtuYHdLNKofltIePIBV+h17wdCJBFLl0ZWtt0+95Fwlaxs3XQyTVsgY75jp5gW+l5XZuXKU20CYpQNIrYjMMznSUCjNpc+pH0kulRUDXU33NyfUwi9wVQZSwNtdO+ScPiidWOpMpcNU/TyjyuM+sCzx+K0ygE9+wjVM3W5J225Rl6txlPkZGp1SAReBD47xF6a3Qjz29eUgcOxzshqVDa/wDmw0u1twNefUd8mY1Qd9fzpKXGhveo36bhLbABuZ781j5wqz/AMRofz5xpcQ6kMDqOp0Pkd421C2Yg/LrOBSBBLNa1j18dr90C1qYlNCP1bDv5rfuP2ijFEaCVlHDZxpmK3vcA2DDntbu36SU7qpAveIlc13Z5xhlI0MbGKsx74PiFuDeaROrsRI7vbtM1h6+g5xqvir3HeLekqsbisqk/nlKK7jHEEzkc++UGJxGY6RK92YnmTGXQjeZtHMIQgEIQgEIQgEIQgEIQgEIQget0vhPiYtDeEIVY4bn4SJjPgPh94QkEHF/CvhIbb+QhCUd0d5NG8ISB/BbmdfqhCBJb7xqvCEBmRsfy8RCECHiPhjOE384QhVtWPZ9ZUN8S+EIRERMTGU3EITSJLbny+glTxPbziQgVwkTEQhII8IQgEIQgEIQgEIQgEIQgEIQgf/Z",
      music: "./assets/music/ROSÉ - 'On The Ground' M-V.mp3",
    },
    {
      id: 8,
      name: "Alcohol Free",
      singer: "TWICE",
      img: "https://file.tinnhac.com/resize/600x-/2021/06/10/20210610100326-3046.jpg",
      music: "./assets/music/TWICE -Alcohol-Free- M-V.mp3",
    },
    {
      id: 9,
      name: "I CAN'T STOP ME",
      singer: "TWICE",
      img: "https://newsmd1fr.keeng.net/tiin/archive/images/20201026/175431_twice_1.jpg",
      music: "./assets/music/TWICE -I CAN'T STOP ME- M-V.mp3",
    },
    {
      id: 10,
      name: "MORE & MORE",
      singer: "TWICE",
      img: "https://vtv1.mediacdn.vn/zoom/550_339/2020/6/2/399ba7e92cde46ad9e583539b807fb11-15910696955611429833111.jpeg",
      music: "./assets/music/TWICE -MORE & MORE- M-V.mp3",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYDER_STORAGE_KEY, JSON.stringify(this.config));
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    randomBtn.classList.toggle("active", this.isRandom);
    this.isRepeat = this.config.isRepeat;
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
        <div
          class="thumb"
          style="
            background-image: url('${song.img}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`;
    });

    playList.innerHTML = htmls.join("");
  },
  definePropertys: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // xu li cd quay
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // xử lí khi phóng to thu nhỏ CD
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    };
    // xử lí khi bấm vào nút play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // khi audio play
    audio.onplay = function () {
      cdThumbAnimate.play();
      _this.isPlaying = true;
      play.classList.add("playing");
      _this.scrollSongIntoView();
    };
    // khi audio pause
    audio.onpause = function () {
      cdThumbAnimate.pause();
      _this.isPlaying = false;
      play.classList.remove("playing");
    };
    //tien do audio
    audio.ontimeupdate = function () {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      if (progressPercent) {
        progress.value = progressPercent;
      }
    };
    //khi tua bai hat
    progress.oninput = function (e) {
      const seekTime = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };
    // khi bam nut next
    nextBtn.onclick = function () {
      setTimeout(function () {}, 100);
      if (_this.isRandom) {
        _this.randomSong();
        setTimeout(function () {
          audio.play();
        }, 100);
      } else {
        _this.nextSong();
        setTimeout(function () {
          audio.play();
        }, 100);
      }
      _this.render();
    };
    // khi bam nut prev
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
        audio.play();
      } else {
        _this.prevSong();
        audio.play();
      }
      _this.render();
    };
    // khi het bai hat
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // khi bam vao nut random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // khi bam vao nut repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // khi bam vao bai hat
    playList.onclick = function (e) {
      const songElement = e.target.closest(".song:not(.active)");
      const optionsElement = e.target.closest(".options");
      if (songElement || optionsElement) {
        if (songElement) {
          _this.currentIndex = Number(songElement.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      }
    };
  },
  scrollSongIntoView: function () {
    $(".song.active").scrollIntoView(false);
  },
  loadCurrentSong: function () {
    header.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.music;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    const randomSong = Math.floor(Math.random() * this.songs.length);
    this.currentIndex = randomSong;
    this.loadCurrentSong();
  },
  start: function () {
    // tai lai confing
    this.loadConfig();
    // Định nghĩa các thuộc tính cho object
    this.definePropertys();
    // lắng nghe các sự kiện của người dùng và xử lí
    this.handleEvents();
    // tải bài hát đầu tiên
    this.loadCurrentSong();
    // in ra danh sách bài hát
    this.render();
  },
};

app.start();
