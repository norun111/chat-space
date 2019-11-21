class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) 
    set_group_users
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end

  end

  private
    def message_params
      params.require(:message).permit(:content,:image).merge(user_id: current_user.id)
    end
    
    def set_group
      @group = Group.find(params[:group_id])
    end

    def set_group_users
      @users = User.joins(:group_users).where(group_users: {group_id: params[:group_id]})
    end  
end
