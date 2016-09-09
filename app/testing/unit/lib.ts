
interface OutputItf {
	log: { (val: string): void }
}

export class LogService {

	constructor(private output: OutputItf){}


	private logDebug(msg:string) {
		this.output.log('[DEBUG] ' + msg);
	}

	private logInfo(msg: string) {
		this.output.log('[INFO] ' + msg);
	}

	private logWarn(msg: string) {
		this.output.log('[WARN] ' + msg);
	}

	private logError(msg: string) {
		this.output.log('[ERROR] ' + msg);
	}


	log(logLevel: string, msg: string) {

		switch (logLevel) {
			case 'DEBUG':
				this.logDebug(msg);
				break;
			case 'INFO':
				this.logInfo(msg);
				break;
			case 'WARN':
				this.logWarn(msg);
				break;
			case 'ERROR':
				this.logError(msg);
				break;
			default:
				this.logInfo(msg);
				break;
		}

	}

}
