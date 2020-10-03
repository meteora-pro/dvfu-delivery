export class CreateOrder {
  public static readonly type = '[Order] Create item';
}

export class RecalculateOrderAppraisal {
  public static readonly type = '[Order] RecalculateOrderAppraisal';
}

export class ChangeMinCostOfDelivery {
  public static readonly type = '[Order] ChangeMinCostOfDelivery';
  constructor(public minCostOfDelivery: number) {}
}
