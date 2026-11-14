export class Mandate {
  constructor(config: { sponsor:string; agent:string; clinic:string; suppliers:string[]; items:Record<string,{quantity:number;maxUnitPrice:bigint}>; budget:bigint; expiresAt:number });
  balance:bigint;
  reserve(caller:string,quote:{id:string;supplier:string;recipient:string;sku:string;quantity:number;unitPrice:bigint;validUntil:number},now:number):unknown;
  confirmDelivery(caller:string,id:string,hash:string,now:number):unknown;
  settleCallback(id:string,succeeded:boolean):void;
}
