import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Eos } from '../../Config';
import { puchaseNewTicket, getTicketBalance } from '../../services/api/treasurehunt_v2';
import { toast } from 'react-toastify';

type RulesProps = {
  setFetchingBalance: Function;
  state: Boolean;
  setState: Function;
  scatter: any;
  dispatch: Function;
}

const TreasurehuntPurchase = ({ state, setState, scatter, setFetchingBalance }: RulesProps) => {
  const [loading, setLoading] = useState({ state: false, amount: 0 })
  const [balance, setBalance] = useState(0)

  const { userAccount } = scatter
  const username = userAccount?.accounts[0].name

  const initializeData = async (username) => {
    setFetchingBalance(true)
    await Eos.rpc.get_currency_balance('eosio.token', username, 'EOS').then(result => {
      setBalance(parseFloat(result[0]))
    }).catch(() => {
      toast.error('Error fetching Scatter EOS balance, try reloading the page')
    })
    await getTicketBalance(username).then(result => {
      setState(parseInt(result.rows[0].balance))
      setFetchingBalance(false)
    }).catch(error => {
      toast.error('Error fetching ticket balance, try reloading the page')
    })
  }

  useEffect(() => {
    if (username != null) {
      initializeData(username)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  const purchase = (amount) => {
    setLoading({ state: true, amount })

    const total = balance - amount
    if (username != null) {
      if (balance - amount >= 0) {
        puchaseNewTicket({ username, amount }).then(() => {
          setLoading({ state: false, amount: 0 })
          setState(amount)
          setBalance(total)
          toast.success(`Purchased ${amount} EOS`)
        }).catch(error => {
          setLoading({ state: false, amount: 0 })
          toast.error(`Error puchasing ticket, please try again`)
        })
      } else {
        setLoading({ state: false, amount: 0 })
        toast.warning(`You don't have enough balance to purchase ${amount} EOS`)
      }
    }
  }
  return (
    <Modal
      backdrop="static"
      dialogClassName="treasurehunt-purchase-modal"
      size="lg"
      show={state}
      onHide={() => setState(false)}
      aria-labelledby="treasurehunt-tutorial"
    >

      <Modal.Header closeButton>
        <Modal.Title id="treasurehunt-tutorial">
          PURCHASE TICKET
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="body-content">
          <div className="d-flex justify-content-end">
            <h3>
              Balance: { balance }
            </h3>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                [1, 5, 10, 50, 100].map(val => (
                  <tr key={val}>
                    <td>{`${val} EOS`}</td>
                    <td>
                      <Button
                        style={{ minWidth: '94px' }}
                        variant="outline-success"
                        onClick={() => purchase(val)}
                        disabled={loading.state || val > balance}
                      >
                        { loading.state && loading.amount === val ? (
                          <>
                            {
                              [1, 2, 3].map((val) => (
                                  <Spinner
                                    key={val}
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ margin: '0 3px' }}
                                  />
                              ))
                            }
                          </>
                        ) : 'Purchase' }
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = ({ scatter }) => ({ scatter });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TreasurehuntPurchase);
