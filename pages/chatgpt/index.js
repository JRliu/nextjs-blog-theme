import axios from "axios";
import { useRef, useState } from "react";
import Layout, { GradientBackground } from '../../components/Layout';
import classNames from "classnames";

export default function ChatGPT({

}) {

	const [answer, setAnswer] = useState('窗前明月光,\n小偷爬进窗')
	const [ask, setAsk] = useState('请给我写一首诗！')
	const [loading, setLoading] = useState(false)
	const formRef = useRef(null)
	const cancelToken = useRef(null)

	const onSubmit = async ({ ask }) => {
		setLoading(true)
		setAnswer('')
		setAsk(ask)
		cancelToken.current = axios.CancelToken.source()
		const res = await axios.get(`https://kang.deno.dev/?ask=${ask}`, {
			cancelToken: cancelToken.current.token
		})

		const result = res.data.choices[0]?.text

		setAnswer(result)

		setLoading(false)
	}

	return (
		<Layout>
			<p className="kbd kbd-lg my-4">傻蛋助手</p>

			<div className="px-4 w-full">
				<textarea
					ref={formRef}
					className={
						classNames("textarea textarea-primary w-full",
							loading && 'hidden',
						)
					} disabled={loading} placeholder={ask} name="ask"></textarea>
				<label className="label">
					<span className="label-text-alt"></span>
					<span className="label-text-alt" onClick={() => {
						formRef.current.value = ''
					}}>清除输入</span>
				</label>
			</div>

			<button className={classNames("btn w-32 block mt-[-20px] mb-3 btn-sm",
				loading ? 'btn-error' : 'btn-primary',
			)} onClick={() => {
				if (loading) {
					cancelToken.current.cancel()
					setLoading(false)
				} else {
					let ask = formRef.current?.value
					if (!ask) {
						ask = formRef.current?.placeholder
						setAsk(ask)
					}

					onSubmit({ ask })
				}
			}}>{
					loading ? '不问啦' : '提问'
				}</button>


			<div className="w-full text-sm">
				{ask && (
					<div className="chat chat-start">
						<div className="chat-image avatar">
							<div className="w-10 rounded-full">
								<img src="https://i.328888.xyz/2023/02/12/cU6wq.jpeg" />
							</div>
						</div>
						<div className="chat-bubble">{ask}</div>
					</div>
				)
				}

				{
					answer && (
						<div className="chat chat-end">
							<div className="chat-image avatar">
								<div className="w-10 rounded-full">
									<img src="https://i.328888.xyz/2023/02/12/cUEGd.png" />
								</div>
							</div>
							<div className="chat-bubble">
								<p
									className="whitespace-pre-wrap"
									dangerouslySetInnerHTML={{
										__html: answer.replace('\n\n', '')
									}}
								></p>
							</div>
						</div>
					)
				}

				{
					loading && (
						<div className="chat chat-end">
							<div className="chat-bubble">
								<div className="animate-bounce text-[40px] mt-5">🤥</div>
							</div>
						</div>
					)
				}


			</div>

			<GradientBackground
				variant="large"
				className="absolute -top-32 opacity-30 dark:opacity-50"
			/>
			<GradientBackground
				variant="small"
				className="absolute bottom-0 opacity-20 dark:opacity-10"
			/>
		</Layout >
	);
}

