class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages"
  end

  def send_message(data)
    p '-------asdasdasd--------asdasdasd--------asdasdasd--------asdasdasd--------asdasdasd---'
    p data['hint']
    message = current_user.messages.create(body: data['body'])
    ActionCable.server.broadcast 'messages', { message: message,
                                               hint: data['hint'],
                                               user: current_user }
  end

  def send_hint(data)
    p '-------asdasdasd--------asdasdasd--------asdasdasd--------asdasdasd--------asdasdasd---'
    message = current_user.messages.create(body: data['body'])
    ActionCable.server.broadcast 'messages', { message: message,
                                               hint: true,
                                               user: current_user }
  end
end
