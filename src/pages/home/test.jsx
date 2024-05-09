import ProgressNotice from "@/components/progressNotice";

const files = [
  {filename: "one",
    progress: 70,
  },
  {filename: "two",
    progress: 60,
  },
]

export default function Test(){
  return (
    <>
      <ProgressNotice files={files}></ProgressNotice>
      1
    </>
  )
}